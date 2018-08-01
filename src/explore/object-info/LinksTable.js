import React from 'react'
import { Table, Column, AutoSizer } from 'react-virtualized'
import './LinksTable.css'

class LinksTable extends React.Component {
  onRowClick = ({rowData}) => {
    const {onLinkClick} = this.props
    onLinkClick(rowData)
  }

  render () {
    const {links} = this.props
    const headerClassName = 'mid-gray fw2 tracked silver'
    return (
      <AutoSizer>
        {({width}) => (
          <Table
            className='tl fw4 LinksTable'
            rowClassName='pointer bb b--near-white f7'
            width={width}
            height={370}
            headerHeight={32}
            rowHeight={29}
            rowCount={links.length}
            rowGetter={({ index }) => ({index, ...links[index]})}
            onRowClick={this.onRowClick}>
            <Column dataKey='index' width={34} className='pv2 silver monospace tr pr1' />
            <Column label='Path' dataKey='path' width={210} flexGrow={1} className='pv2 navy f6' headerClassName={headerClassName} />
            <Column label='CID' dataKey='target' width={360} className='pv2 mid-gray monospace' headerClassName={headerClassName} />
          </Table>
        )}
      </AutoSizer>
    )
  }
}

export default LinksTable
