import React, { Fragment, useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import Head from "next/head";
import { Spin, Button } from "antd";

import { getHomeList, setPage } from "@/redux/actions/homeActions";
import { setNum } from "@/redux/actions/testActions";
import ListItem from "@/components/ListItem";
import throttle from "@/utils/throttle";

import "@/assets/styles/index.scss";

const Index = ({ homeList, getList, page, setPage }) => {
  let [isLoading, setLoading] = useState(false);
  let clientHeightRef= useRef()
  const pageSize = 20;

  // 避免hooks闭包陷阱?，useRef每次渲染返回的是同一对象
  let loadRef = useRef();
  loadRef.current = isLoading;

  useEffect(() => {
    console.log('---didMount---')
    const clientHeight = document.documentElement.clientHeight;
    clientHeightRef.current= clientHeight
    const _onScroll= throttle(onScroll, 300)
    document.addEventListener("scroll", _onScroll, false);
    return () => document.removeEventListener('scroll', _onScroll, false)
  }, []);

  const onScroll = (e) => {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const height =
      document.documentElement.scrollHeight || document.body.scrollHeight;

    if (height - scrollTop - clientHeightRef.current < 120) {
      if (loadRef.current) return null;
      setLoading(true);
      loadMore()
    }
  };

  const loadMore = () => {
    page++;
    getList({ limit: pageSize, page }).then((res) => {
      setLoading(false)
      setPage(page);
    });
  };

  return (
    <Fragment>
      <Head>
        <title>Just do it !!!</title>
      </Head>
      <div className="list-container">
        {homeList.length > 0 &&
          homeList.map((item) => {
            return <ListItem key={item.id} data={item} />;
          })}
      </div>
      <div className='loading-container'>
        { isLoading && <Spin /> }
      </div>
    </Fragment>
  );
};

Index.getInitialProps = async ({ ctx }) => {
  const { isServer, store } = ctx;
  if (store.getState().home.homeList.length === 0) {
    const promises = [];

    promises.push(store.dispatch(setNum(3)));
    promises.push(
      store.dispatch(getHomeList({ limit: 20, page: 1 }, isServer))
    );
    let data = await Promise.all(promises);

    return {
      // homeList: data[1]? data[1]: [],
      // num: data[0]
    };
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    homeList: state.home.homeList,
    page: state.home.page
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setNum: (num) => dispatch(setNum(num)),
    getList: (params) => dispatch(getHomeList(params)),
    setPage: page => dispatch(setPage(page))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
