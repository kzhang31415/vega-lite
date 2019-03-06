import { vgField } from '../../fielddef';
import { DEFAULT_SORT_OP, isSortField } from '../../sort';
import { facetSortFieldName } from '../facet';
import { WindowTransformNode } from './window';
export function makeWindowFromFacet(parent, facet) {
    const { row, column } = facet;
    if (row && column) {
        let newParent = null;
        // only need to make one for crossed facet
        for (const fieldDef of [row, column]) {
            if (isSortField(fieldDef.sort)) {
                const { field, op = DEFAULT_SORT_OP } = fieldDef.sort;
                parent = newParent = new WindowTransformNode(parent, {
                    window: [
                        {
                            op,
                            field,
                            as: facetSortFieldName(fieldDef, fieldDef.sort, { forAs: true })
                        }
                    ],
                    groupby: [vgField(fieldDef)],
                    frame: [null, null]
                });
            }
        }
        return newParent;
    }
    return null;
}
//# sourceMappingURL=windowfacet.js.map