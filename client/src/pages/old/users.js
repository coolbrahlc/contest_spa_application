// import React, { Component } from 'react';
// import '../App.css';
// import axios from 'axios';
// import {PacmanLoader} from 'react-spinners'
// import connect from 'react-redux/es/connect/connect'
// import  {testAction} from '../../src/actions/actionCreator'
//
//
// class  Users extends Component {
//
//     renderLoader() {
//         return (<PacmanLoader
//                     sizeUnit={"px"}
//                     size={40 }
//                     color={'#123abc'}
//                     loading={this.props.isFetching}
//                 />);
//     }
//
//
//     NumberList() {
//         const onItemClick =  (id) => {
//             this.props.history.push('/users/'+id);
//         };
//
//         const listItems = this.props.users.map((number) =>
//             <li onClick={() => onItemClick(number.id)}
//                 key={number.id}>
//                 {number.id} {number.full_name}
//             </li>
//         );
//
//         return (
//             <ul>{listItems}</ul>
//         );
//     }
//
//
//     render() {
//             console.log(this.props.isFetching);
//         return (
//             <div className="Users">
//                 {this.props.isFetching? this.renderLoader() : this.NumberList()}
//             </div>
//         );
//     }
//
//     componentDidMount() {
//
//         setTimeout(()=>{this.props.testAction()}, 1) ;
//     }
// }
//
// const mapStateToProps =(state) => {
//
//     return {
//         state,
//         isFetching: state.testReducer.isFetching,
//         users: state.testReducer.users
//     }
// };
//
// const mapDispatchToProps =(dispatch) => ({
//     testAction: () => dispatch(testAction())
// });
//
// export default connect(mapStateToProps, mapDispatchToProps)(Users);
