import React, {Component} from 'react';
import {formCurencyVN} from '../../../common/funcCommon';
import {Link} from 'react-router-dom';

class ItemHistory extends Component {
  render() {
    const {data, index} = this.props;
    let statusName = data.status ? 'Đã thanh toán' : 'Đã hủy';
    let statusClass = data.status
      ? 'bg-warning p-2 text-white'
      : 'bg-info p-2 text-white';
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{data.nameTour}</td>
        <td>
          <span className="text-danger" style={{fontSize: '1.2rem'}}>
            {formCurencyVN(data.sumPrice)}
          </span>
        </td>
        <td>{new Date(data.time).toLocaleDateString('en-GB')}</td>
        <td>{new Date(data.timeChose).toLocaleDateString('en-GB')}</td>
        <td>
          <span className={statusClass}>{statusName}</span>
        </td>
        <td>
          <Link to={`/booking/${data.id}`} className="btn btn-info ml-2">
            Chi tiết
          </Link>
        </td>
      </tr>
    );
  }
}

export default ItemHistory;
