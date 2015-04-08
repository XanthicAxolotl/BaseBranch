var React = require('react');
var FixedDataTable = require('fixed-data-table');

var Table = FixedDataTable;
var Column = FixedDataTable.Column;


var rows = [
  ['a1', 'b1', 'c1'],
  ['a2', 'b3', 'c2'],
  ['a3', 'b3', 'c3']
];

function rowGetter(rowIndex) {
  return rows[rowIndex];
}

var NodeView = React.createClass({
  render: function() {
    return(
      <Table
    rowHeight={50}
    rowGetter={rowGetter}
    rowsCount={rows.length}
    width={5000}
    height={5000}
    headerHeight={50}>
    <Column
      label="Col 1"
      width={3000}
      dataKey={0}/>
    <Column
      label="Col 2"
      width={2000}
      dataKey={1}/>
  </Table>      
    );
  }
});




// var menuItems = [[
//                   id: '1',
//                   desc:'Example Framework 1',
//                   author:'Xanthic Axolotl',
//                   anchor:'http://www.walmart.com',
//                   update: new Date().getDate,
//                   rating: 20,
//                   resources: [{key: 1, name: 'Super Awesome Javascript Blog!'}]
//                 ],
//                 [
//                   id: '2',
//                   desc:'Example Framework 1',
//                   author:'Xanthic Axolotl',
//                   anchor:'http://www.walmart.com',
//                   update: new Date().getDate,
//                   rating: 20,
//                   resources: [{key: 1, name: 'Super Awesome Javascript Blog!'}]
//                 ]];



// var ResourceHeadRow = React.createClass({
//   render: function() {
//     return(<tr><th colSpan="2">{this.props.resources.name}</th></tr>);
//   }
// });

// var ResourceRow = React.createClass({
//   render: function() {
//     return (
//        <tr>
//          <td>this.props.menuItems.resources.name</td>
//          <td>this.props.menuItems.author</td>
//        </tr>
//     );
//   }
// });

// var NodeView = React.createClass({
//   render: function() {
//     console.log('we made it');
//     var rows = [];
//     this.props.menuItems.forEach(function(menuItem) {
//       rows.push(<ResourceRow menuItem={menuItem} key={menuItem.author} />);
//     }.bind(this));
//     return(
//        <table>
//          <thead>
//            <tr>
//              <th>Name</th>
//              <th>Price</th>
//             </tr>
//           </thead>
//           <tbody>{rows}</tbody>
//         </table>
//     );
//   }
// });




module.exports = NodeView;