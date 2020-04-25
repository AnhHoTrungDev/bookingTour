import React, {Component} from 'react';
import callApi from '../../../common/callAPI';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {setDataSearch} from '../../../action/search';
import Waiting from '../../../common/waiting';
import Slider from '../../../common/slider/slider';

class BgListTour extends Component {
  constructor() {
    super();
    this.state = {
      tours: [],
      isUnmounting: false,
    };
  }

  // get  data
  componentDidMount() {
    this.setState({isUnmounting: false});

    callApi(
      `tours?style=${this.props.styleTour}&_limit=${this.props.limit}`,
      'Get',
      null
    ).then((res) => {
      if (res && res.data && !this.state.isUnmounting)
        this.setState({tours: res.data});
    });
    // callApi(`tours`, "Get", null).then((res) => {
    //   if (res && res.data && !this.state.isUnmounting)
    //     this.setState({ tours: res.data });
    // });
  }

  componentWillUnmount() {
    this.setState({isUnmounting: true});
  }

  getDataAndDispatch = () => {
    let data = {
      q: '',
      typeTour: this.props.styleTour,
      dateStart: '',
    };
    this.props.getDataSearch(data);

    return this.props.history.push('/tour');
  };

  render() {
    let datas = this.state.tours;
    const {titleName} = this.props;
    console.log('titleName', titleName);
    let classTitle = '';
    let classColor = '';
    if (titleName) {
      if (titleName === 'Tour Hot') {
        classTitle = 'bg-danger';
        classColor = 'btn-outline-danger';
      }
      if (titleName === 'Giảm Giá') {
        classTitle = 'bg-success';
        classColor = 'btn-outline-success';
      }
      if (titleName === 'Nước Ngoài') {
        classTitle = 'bg-info';
        classColor = 'btn-outline-info';
      }
    }
    return (
      // list tour
      <div className=" container px-0 my-5 p-2">
        <div className="d-flex justify-content-between title-and-seeMove">
          <h5 className={`${classTitle} p-2 pb-3 rounded text-white`}>
            {titleName}
          </h5>
        </div>
        <div>
          {/* display  box  */}
          {datas && datas.length > 0 ? (
            // datas.map((data, i) => {
            //   return <FormBoxTour key={"FormBoxTour" + i} data={data} />;
            // })
            <Slider data={datas} />
          ) : (
            <Waiting />
          )}
          {/* end display  box  */}
        </div>
        <div className="d-flex justify-content-end mt-2">
          <Link
            className={`btn ${classColor}`}
            to={'#'}
            onClick={this.getDataAndDispatch}
            tabIndex="NULL"
          >
            Xem Thêm
          </Link>
        </div>
      </div>
      // end list tour
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDataSearch: (data) => dispatch(setDataSearch(data)),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(BgListTour));
