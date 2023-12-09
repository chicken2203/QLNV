import React from 'react';
import MaterialTable from 'material-table';
import 'app/assets/DataTable.scss';

function DataTable({ data, columns, paging = true, pageSize, title, disableToolbar }) {
    const search = disableToolbar ? false : true;
    const toolbar = disableToolbar ? false : true;

    const commonBorderStyle = {
        border: '1px solid #99999978',
    };

    const sortedData = data?.sort((a, b) => b.id - a.id);

    const localization = {
        body: {
            emptyDataSourceMessage: 'Không có dữ liệu',
        },
        pagination: {
            labelDisplayedRows: 'Từ {from}- đến {to} trên {count}',
            labelRowsSelect: 'Bản ghi:',
            firstTooltip: 'Trang đầu',
            previousTooltip: 'Trang trước',
            nextTooltip: 'Trang sau',
            lastTooltip: 'Trang cuối',
        },
        toolbar: {
            searchPlaceholder: 'Tìm kiếm...',
        },
    };

    return (
        <>
            <MaterialTable
                title={title || null}
                columns={columns}
                data={sortedData}
                style={{
                    boxShadow: 'none',
                    border: 'none',
                    background: 'transparent',
                }}
                options={{
                    search: search,
                    sorting: false,
                    paging: paging,
                    draggable: false,
                    pageSize: pageSize || 10,
                    pageSizeOptions: [1, 2, 3, 5, 10, 25, 50, 100],
                    filtering: false,
                    toolbar: toolbar,
                    header: true,
                    headerStyle: {
                        backgroundColor: '#7467EF',
                        color: '#fff',
                        ...commonBorderStyle,
                        textAlign: 'center',
                        padding: 5,
                    },
                    cellStyle: {
                        ...commonBorderStyle,
                        padding: 5,
                    },
                    rowStyle: (rowData, index) => ({
                        backgroundColor: index % 2 === 0 ? '#FFF' : '#EEE',
                        ...commonBorderStyle,
                    }),
                    searchFieldAlignment: 'right',
                    searchFieldStyle: {
                        minWidth: '30%',
                        color: '#7567EF',
                    },
                    searchFieldVariant: 'outlined',
                }}
                localization={localization}
            />
        </>
    );
}

export default DataTable;
