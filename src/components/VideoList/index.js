import React from 'react';
import {Avatar, Card, Icon, List, Spin} from 'antd';
import {connect} from 'dva';
import InfiniteScroll from 'react-infinite-scroller';
import PropTypes from 'prop-types';

const {Meta} = Card;

class VideoList extends React.Component {
    constructor(props) {
        super(...props);

        this.state = {};

        this.handleLoadVideos = this.handleLoadVideos.bind(this);
    }

    static propTypes = {
        spinning: PropTypes.func
    };

    handleLoadVideos() {
        if (!this.props.video.hasMore) {
            return;
        }

        const {dispatch} = this.props;

        return dispatch({
            type: 'video/loadMore',
        });
    }

    componentWillMount() {
        const {dispatch} = this.props;

        dispatch({
            type: 'video/fetch',
        });

        this.props.spinning(this.props.video.loading);
    }

    render() {
        const {video} = this.props;
        const spin = (
            <Spin size={'large'}
                  style={{
                      position: "absolute",
                      margin: "10px 0 40px 0",
                      bottom: "-40px",
                      left: "50%"
                  }}/>
        );

        return (
            <div>
                <InfiniteScroll
                    initialLoad={false}
                    pageStart={0}
                    loadMore={this.handleLoadVideos}
                    hasMore={!video.loading && video.hasMore}
                    useWindow={true}
                    loader={spin}
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

export default connect(state => ({
    video: state.video,
}))(VideoList);
