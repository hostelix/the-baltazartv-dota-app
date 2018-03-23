import React from 'react';
import {Card, Icon, Avatar, List, Spin} from 'antd';
import {connect} from 'dva';
import InfiniteScroll from 'react-infinite-scroller';
import PropTypes from 'prop-types';

const {Meta} = Card;

class VideoList extends React.Component {
    constructor(props) {
        super(...props);

        this.handleLoadVideos = this.handleLoadVideos.bind(this);
    }

    handleLoadVideos() {
        const {dispatch} = this.props;

        setTimeout(() => {
            dispatch({
                type: 'video/fetchMore',
            });
        }, 500);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.querySearch !== "") {

            const {dispatch} = this.props;

            dispatch({
                type: 'video/search',
                payload: {query: nextProps.querySearch}
            });
        }
    }

    componentWillMount() {
        const {dispatch} = this.props;

        dispatch({
            type: 'video/fetchInit',
        });

        this.props.spinning(this.props.video.loading);
    }

    render() {
        const {video} = this.props;
        return (
            <div>
                <InfiniteScroll
                    initialLoad={false}
                    pageStart={0}
                    loadMore={this.handleLoadVideos}
                    hasMore={!video.loading && video.hasMore}
                    useWindow={true}
                    loader={<Spin size="large"
                                  style={{
                                      position: "absolute",
                                      margin: "10px 0 40px 0",
                                      bottom: "-40px",
                                      left: "50%"
                                  }}/>}
                >
                    <List
                        grid={{gutter: 16, column: 4}}
                        dataSource={video.data}
                        loading={video.loading}
                        renderItem={video => (
                            <List.Item key={video.id}>
                                <Card
                                    style={{width: 300}}
                                    cover={<img alt="example"
                                                src={video.snippet.thumbnails.medium.url}/>}
                                    actions={[<Icon type="heart"/>, <div>123 <Icon type="eye"/></div>,
                                        <Icon type="ellipsis"/>]}
                                >
                                    <Meta
                                        avatar={<Avatar
                                            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                                        title={video.snippet.title}
                                        description="description"/>
                                </Card>
                            </List.Item>
                        )}
                    >
                    </List>
                </InfiniteScroll>
            </div>
        )
    }
}

VideoList.propTypes = {
    querySearch: PropTypes.string,
    spinning: PropTypes.func
};

export default connect(state => ({
    video: state.video,
}))(VideoList);
