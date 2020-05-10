import React, {useEffect} from 'react';
import callApi from '../../common/callAPI';
import {useState} from 'react';
import {formCurencyVN} from '../../common/funcCommon';
import NotFound from '../bodys/home/notFound/404NotFound';
import Waiting from '../../common/waiting';
import ItemHistory from '../bodys/history-booking/ItemHistory';

const DetailBooking = (props) => {
  const [getData, setGetData] = useState();
  const [statusGetData, setStatusGetData] = useState('pending');
  const [bookingTour, setBookingTour] = useState([]);
  useEffect(() => {
    setStatusGetData('pending');
    let isUnmounting = false;
    callApi(`bookings_tour?id=${props.match.params.id}`, 'Get', null).then(
      (res) => {
        if (
          res &&
          res.data[0] &&
          !isUnmounting &&
          res.status === 200 &&
          res.data
        ) {
          setGetData(res.data[0]);
          setStatusGetData('finish');
        } else setStatusGetData('error');
      }
    );
    return () => {
      isUnmounting = true;
    };
  }, [props.match.params.id]);

  useEffect(() => {
    callApi(`bookings_tour`, 'Get', null).then((res) => {
      if (res && res.data && res.status === 200) {
        console.log('res.data :>> ', res.data);
        setBookingTour(res.data);
      } else setBookingTour([]);
    });
    console.log('bookingTour :>> ', bookingTour);
  }, []);

  useEffect(() => {
    console.log('bookingTour :>> ', bookingTour);
    if (bookingTour.length > 0) {
      if (bookingTour.length === 1) {
        callApi(
          `data_tours_booked`,
          'Post',
          setDataToursBooked(bookingTour[0].userID)
        ).then((res) => {});
      }
      if (bookingTour.length > 1) {
        if (
          bookingTour[bookingTour.length - 1].userID ===
          bookingTour[bookingTour.length - 2].userID
        ) {
          callApi(
            `data_tours_booked/${bookingTour[bookingTour.length - 2].userID}`,
            'Put',
            setDataToursBooked(bookingTour[bookingTour.length - 2].userID)
          ).then((res) => {});
        } else
          callApi(
            `data_tours_booked`,
            'Post',
            setDataToursBooked(bookingTour[bookingTour.length - 1].userID)
          ).then((res) => {});
      }
    }
  });

  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function setDataToursBooked(id) {
    console.log('bookingTour :>> ', bookingTour);
    let arrDatas = bookingTour.filter((item) => {
      if (item.userID === id) return item;
    });
    console.log('arrDatas :>> ', arrDatas);
    let total = 0;
    let tourBooked = arrDatas.length;
    let dataPrice = arrDatas.map((item) => item.sumPrice);
    console.log('dataPrice :>> ', dataPrice);
    if (dataPrice.length === 1) total = dataPrice[0];
    if (dataPrice.length > 1) total = dataPrice.reduce((a, b) =>  a + b);
    console.log('this.total :>> ', total + ' ' + tourBooked);
    let dataTours = {
      id: id,
      userName: arrDatas[0]&&arrDatas[0].userName,
      tourBooked: tourBooked,
      total: total,
      color: getRandomColor(),
      status: arrDatas[0]&&arrDatas[0].status,
    };
    console.log('dataTours :>> ', dataTours);
    return {...dataTours};
  }

  return statusGetData === 'finish' ? (
    <div className="container">
      <div className="card">
        <div className="card-header">
          Invoice:
          <strong> {new Date(getData.time).toLocaleString('en-GB')}</strong>
          <span className="float-right">
            {' '}
            <strong>Status:</strong>{' '}
            <span style={{textTransform: 'uppercase'}} className="text-success">
              {' '}
              {getData.status}
            </span>
          </span>
        </div>
        <div className="card-body">
          <div className="row mb-4">
            <div className="col-sm-6 ">
              Booking By : <strong>{getData.userName}</strong>
            </div>
            <div className="col-sm-6 text-left">
              Tour : <strong>{getData.nameTour}</strong>
            </div>
            <div className="ml-auto col-sm-6 text-left ">
              Start Day :{' '}
              <strong>
                {new Date(getData.timeChose).toLocaleDateString('en-GB')}
              </strong>
            </div>
          </div>

          <div className="table-responsive-sm">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th className="center">#</th>
                  <th>Ticket Type </th>

                  <th className="right">Unit Cost</th>
                  <th className="center">Qty</th>
                  <th className="right">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="center">1</td>
                  <td className="left strong">Normal</td>

                  <td className="right">
                    {getData.numberOfTickerNormal === 0
                      ? formCurencyVN(0)
                      : formCurencyVN(
                          getData.priceNormalTicker /
                            getData.numberOfTickerNormal
                        )}
                  </td>
                  <td className="center">{getData.numberOfTickerNormal}</td>
                  <td className="right">
                    {formCurencyVN(getData.priceNormalTicker)}
                  </td>
                </tr>
                <tr>
                  <td className="center">2</td>
                  <td className="left strong">Child Tickets</td>

                  <td className="right">
                    {getData.numberOfChildrenTicker === 0
                      ? formCurencyVN(0)
                      : formCurencyVN(
                          getData.priceNormalChildrenTicker /
                            getData.numberOfChildrenTicker
                        )}
                  </td>
                  <td className="center">{getData.numberOfChildrenTicker}</td>
                  <td className="right">
                    {formCurencyVN(getData.priceNormalChildrenTicker)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="row">
            <div className="col-lg-4 col-sm-5"></div>

            <div className="col-lg-4 col-sm-5 ml-auto">
              <table className="table table-clear">
                <tbody>
                  <tr>
                    <td className="left">
                      <strong>Subtotal</strong>
                    </td>
                    <td className="right">0</td>
                  </tr>
                  <tr>
                    <td className="left">
                      <strong>Discount (0%)</strong>
                    </td>
                    <td className="right">0</td>
                  </tr>
                  <tr>
                    <td className="left">
                      <strong>VAT (0%)</strong>
                    </td>
                    <td className="right">0</td>
                  </tr>
                  <tr>
                    <td className="left">
                      <strong>Total</strong>
                    </td>
                    <td className="right">
                      <strong>{formCurencyVN(getData.sumPrice)}</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : statusGetData === 'error' ? (
    <NotFound />
  ) : (
    <Waiting />
  );
};

export default DetailBooking;
