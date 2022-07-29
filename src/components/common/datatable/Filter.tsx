import DebouncedInput from 'components/common/datatable/DebouncedInput';
import { useMemo } from 'react';
import { Column, Table } from '@tanstack/react-table';

export default function Filter({column, table,}: { column: Column<any, unknown>, table: Table<any> }) {
    const firstValue = table
        .getPreFilteredRowModel()
        .flatRows[0]?.getValue(column.id);

    const columnFilterValue = column.getFilterValue();

    const sortedUniqueValues = useMemo(
        () => typeof firstValue === 'number' ? [] : Array.from(column.getFacetedUniqueValues().keys()).sort(),
        [column.getFacetedUniqueValues()]
    );

    return typeof firstValue === 'number' ? (
        <div>
            <div className="d-flex">
                <DebouncedInput type="number"
                                min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
                                max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
                                value={(columnFilterValue as [number, number])?.[0] ?? ''}
                                onChange={value =>
                                    column.setFilterValue((old: [number, number]) => [value, old?.[1]])
                                }
                                placeholder={`Min ${
                                    column.getFacetedMinMaxValues()?.[0]
                                        ? `(${column.getFacetedMinMaxValues()?.[0]})`
                                        : ''
                                }`} className="w-24 border shadow-sm rounded me-1"
                />
                <DebouncedInput type="number"
                                min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
                                max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
                                value={(columnFilterValue as [number, number])?.[1] ?? ''} onChange={value =>
                    column.setFilterValue((old: [number, number]) => [old?.[0], value])
                }
                                placeholder={`Max ${column.getFacetedMinMaxValues()?.[1] ? `(${column.getFacetedMinMaxValues()?.[1]})` : ''}`}
                                className="w-24 border shadow-sm rounded"
                />
            </div>
            <div className="h-1"/>
        </div>
    ) : (
        <>
            <datalist id={column.id + 'list'}>
                {sortedUniqueValues.slice(0, 5000).map((value, i) => <option value={value} key={`option-${i}`}/>)}
            </datalist>
            <DebouncedInput type="text"
                            value={String(columnFilterValue ?? '')}
                            onChange={value => column.setFilterValue(value)}
                            placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
                            className="w-36 border shadow-sm rounded"
                            list={column.id + 'list'}
            />
            <div className="h-1"/>
        </>
    );
}
