import { describe, expect, it } from 'vitest';
import type { FigmaNode } from '../scripts/figma.ts';
import { parseHierarchy } from '../scripts/figma.ts';
import { resolveMapping } from '../scripts/mapping.ts';
import { planMapping } from '../scripts/planning.ts';
import { getSource } from '../src/schema.ts';
import type { IllustrationCatalog } from '../src/schema.ts';

const FIGMA_FILE_KEY = getSource('barnehage').fileKey;
const FIGMA_PAGE_NODE_ID = getSource('barnehage').pageNodeId;
const empty: IllustrationCatalog = {
  schemaVersion: 2,
  state: 'pending-import',
  families: [],
};
function fixture() {
  const root: FigmaNode = {
    id: FIGMA_PAGE_NODE_ID,
    name: 'Barnehage',
    type: 'CANVAS',
    children: [
      {
        id: '1:1',
        name: 'Aktivitet',
        type: 'FRAME',
        children: [
          {
            id: '1:2',
            name: 'aktivitet-1',
            type: 'COMPONENT_SET',
            componentPropertyDefinitions: {
              Format: {
                type: 'VARIANT',
                defaultValue: 'Square (1:1)',
                variantOptions: ['Square (1:1)'],
              },
              'Color theme': {
                type: 'VARIANT',
                defaultValue: 'alt 1',
                variantOptions: ['alt 1'],
              },
              Background: {
                type: 'VARIANT',
                defaultValue: 'True',
                variantOptions: ['True'],
              },
              'Geometric shape#30:0': { type: 'BOOLEAN', defaultValue: true },
            },
            children: [
              {
                id: '1:3',
                type: 'COMPONENT',
                name: 'Format=Square (1:1), Color theme=alt 1, Background=True',
                absoluteBoundingBox: { width: 10, height: 10 },
              },
            ],
          },
          {
            id: '1:4',
            name: 'aktivitet-1',
            type: 'INSTANCE',
            componentId: '1:3',
            absoluteBoundingBox: { width: 10, height: 10 },
            componentProperties: {
              'Geometric shape#30:0': { type: 'BOOLEAN', value: false },
            },
          },
        ],
      },
    ],
  };
  const evidence = {
    fileKey: FIGMA_FILE_KEY,
    pageNodeId: FIGMA_PAGE_NODE_ID,
    inspectedAt: '2026-10-01T00:00:00.000Z',
    hierarchy: {
      nodes: {
        [FIGMA_PAGE_NODE_ID]: { document: root },
      },
    },
  };
  return { root, evidence };
}

describe('evidence-based mapping planning', () => {
  it('reports explicitly empty templates without dropping artwork families or treating truncation as empty', () => {
    const { root, evidence } = fixture();
    const category = root.children![0];
    const template = structuredClone(category.children![0]);
    template.id = '8:1';
    template.name = 'Empty template';
    template.children![0].id = '8:2';
    template.children![0].children = [
      { id: '8:3', name: '_safezone', type: 'FRAME', visible: false },
    ];
    category.children!.push(template);
    expect(
      parseHierarchy(evidence.hierarchy, FIGMA_PAGE_NODE_ID).children![0]
        .children![2].children![0].children![0].visible,
    ).toBe(false);
    const report = planMapping(evidence, 'barnehage').report;
    expect(report.approvalReady).toBe(true);
    expect(report.counts.families).toBe(1);
    expect(report.counts.emptyTemplateFamilies).toBe(1);
    expect(
      report.exclusions.find((item) => item.nodeId === '8:1')?.reason,
    ).toContain('empty template');
    for (const visible of [true, undefined]) {
      template.children![0].children![0].visible = visible;
      expect(
        planMapping(evidence, 'barnehage').report.counts.emptyTemplateFamilies,
      ).toBe(0);
    }
    template.children![0].children = [];
    expect(
      planMapping(evidence, 'barnehage').report.counts.emptyTemplateFamilies,
    ).toBe(0);
    delete template.children![0].children;
    expect(
      planMapping(evidence, 'barnehage').report.counts.emptyTemplateFamilies,
    ).toBe(0);
  });
  it('retains parsed appearance evidence and maps defaults versus sibling overrides', () => {
    const { evidence } = fixture();
    const parsed = parseHierarchy(evidence.hierarchy, FIGMA_PAGE_NODE_ID);
    expect(parsed.children?.[0].children?.[1].componentId).toBe('1:3');
    const { mapping, report } = planMapping(evidence, 'barnehage');
    expect(report.approvalReady).toBe(true);
    expect(report.counts).toMatchObject({
      families: 1,
      components: 1,
      instances: 1,
      variants: 2,
      unmatchedNodes: 0,
    });
    const [base, instance] = mapping.families[0].variants;
    expect(base.properties).toEqual({
      Format: 'Kvadrat (1:1)',
      Fargetema: 'grønn',
      Bakgrunn: 'Ja',
      'Geometrisk form': 'Ja',
    });
    expect(instance.properties['Geometrisk form']).toBe('Nei');
    expect(base.componentId).toBeUndefined();
    expect(instance.componentId).toBe('1:3');
    expect(mapping.families[0].id).toBe('aktivitet-1-1-2');
    expect(instance.id).toBe('aktivitet-1-1-4');
    expect(instance.name).not.toContain('#30:0');
  });

  it('permits siblings only with a matching in-set source reference, within the page', () => {
    const { root, evidence } = fixture();
    const { mapping } = planMapping(evidence, 'barnehage');
    expect(
      resolveMapping(mapping, root, empty, false, 'barnehage').families[0]
        .variants,
    ).toHaveLength(2);
    const missingReference = structuredClone(mapping);
    delete missingReference.families[0].variants[1].componentId;
    expect(() =>
      resolveMapping(missingReference, root, empty, false, 'barnehage'),
    ).toThrow(/not in family/);
    const wrongReference = structuredClone(mapping);
    wrongReference.families[0].variants[1].componentId = '9:9';
    expect(() =>
      resolveMapping(wrongReference, root, empty, false, 'barnehage'),
    ).toThrow(/source component/);
    const differentSet = structuredClone(root);
    const family = differentSet.children![0].children![0];
    const component = family.children!.pop()!;
    differentSet.children!.push({
      id: '9:9',
      name: 'Other',
      type: 'COMPONENT_SET',
      children: [component],
    });
    const instanceOnly = structuredClone(mapping);
    instanceOnly.families[0].variants.shift();
    expect(() =>
      resolveMapping(instanceOnly, differentSet, empty, false, 'barnehage'),
    ).toThrow(/source component/);
    const absent = structuredClone(root);
    absent.children![0].children!.pop();
    expect(() =>
      resolveMapping(mapping, absent, empty, false, 'barnehage'),
    ).toThrow();
    expect(() =>
      resolveMapping(
        mapping,
        { ...root, id: '9:9' },
        empty,
        false,
        'barnehage',
      ),
    ).toThrow(/intended Figma page/);
    const notInstance = structuredClone(root);
    notInstance.children![0].children![1].type = 'FRAME';
    expect(() =>
      resolveMapping(mapping, notInstance, empty, false, 'barnehage'),
    ).toThrow(/source component/);
  });

  it('flags repeated signatures without discarding nodes', () => {
    const { root, evidence } = fixture();
    root.children![0].children![1].componentProperties![
      'Geometric shape#30:0'
    ].value = true;
    const { mapping, report } = planMapping(evidence, 'barnehage');
    expect(mapping.families[0].variants).toHaveLength(2);
    expect(report.approvalReady).toBe(false);
    expect(report.families[0].duplicates[0].nodeIds).toEqual(['1:3', '1:4']);
  });

  it('includes appearance TEXT and INSTANCE_SWAP, blocking unresolved labels', () => {
    const { root, evidence } = fixture();
    const set = root.children![0].children![0];
    set.componentPropertyDefinitions!['Character#46:7'] = {
      type: 'INSTANCE_SWAP',
      defaultValue: '38:54613',
    };
    set.componentPropertyDefinitions!['Caption#1:0'] = {
      type: 'TEXT',
      defaultValue: 'Hello',
    };
    const { mapping, report } = planMapping(evidence, 'barnehage');
    expect(report.approvalReady).toBe(false);
    expect(report.issues).toContain(
      'Unresolved readable INSTANCE_SWAP label: aktivitet-1 Character#46:7 = 38:54613.',
    );
    expect(mapping.families[0].variants[0].properties).toMatchObject({
      Karakter: '38:54613',
      Caption: 'Hello',
    });
    const namedEvidence = {
      ...evidence,
      hierarchy: {
        nodes: {
          [FIGMA_PAGE_NODE_ID]: {
            document: root,
            components: { '38:54613': { name: 'Readable source character' } },
          },
        },
      },
    };
    expect(planMapping(namedEvidence, 'barnehage').report.approvalReady).toBe(
      true,
    );
    expect(
      planMapping(namedEvidence, 'barnehage').mapping.families[0].variants[0]
        .properties.Karakter,
    ).toBe('Readable source character');
    const resolved = planMapping(
      {
        ...evidence,
        referenceComponents: { '38:54613': { name: 'Object=Guitar' } },
      },
      'barnehage',
    );
    expect(resolved.report.approvalReady).toBe(true);
    expect(resolved.mapping.families[0].variants[0].properties.Karakter).toBe(
      'Object: Guitar',
    );
  });

  it('excludes presentation and nested art, but blocks unknown instances', () => {
    const { root, evidence } = fixture();
    root.children![0].children!.push({
      id: '1:5',
      name: '_status',
      type: 'INSTANCE',
      componentId: '9:9',
    });
    root.children![0].children![0].children![0].children = [
      { id: '1:6', name: 'art', type: 'FRAME' },
    ];
    expect(planMapping(evidence, 'barnehage').report.approvalReady).toBe(true);
    root.children![0].children!.push({
      id: '1:7',
      name: 'Unreviewed',
      type: 'INSTANCE',
      componentId: '9:9',
    });
    expect(
      planMapping(evidence, 'barnehage').report.counts.unmatchedNodes,
    ).toBe(1);
    expect(planMapping(evidence, 'barnehage').report.approvalReady).toBe(false);
  });

  it('blocks mismatched axes, unknown overrides, and incorrect inventory provenance', () => {
    const { root, evidence } = fixture();
    root.children![0].children![1].componentProperties!.Format = {
      type: 'VARIANT',
      value: 'Landscape (16:9)',
    };
    expect(
      planMapping(evidence, 'barnehage').report.issues.join(' '),
    ).toContain('VARIANT evidence');
    root.children![0].children![1].componentProperties!.Extra = {
      type: 'BOOLEAN',
      value: true,
    };
    expect(
      planMapping(evidence, 'barnehage').report.issues.join(' '),
    ).toContain('Unrepresented appearance override');
    expect(() =>
      planMapping({ ...evidence, fileKey: 'wrong-file' }, 'barnehage'),
    ).toThrow();
  });
});
