import React from 'react';
import {Card, Icon, Avatar, List, Spin} from 'antd';
import {connect} from 'dva';
import AppService from '../../services/app';
import InfiniteScroll from 'react-infinite-scroller';
import PropTypes from 'prop-types';

const {Meta} = Card;

class VideoList extends React.Component {
    constructor(props) {
        super(...props);

        this.state = {
            videos: [],
            loadingScroll: false,
            hasMore: false,
            nextPageToken: ""
        };

        this.appService = new AppService();
        this.handleLoadVideos = this.handleLoadVideos.bind(this);
        this.handleSearch = this.handleSearch(this);
    }

    handleLoadVideos() {
        this.appService.getVideos({
            pageToken: this.state.nextPageToken,
            maxResults: 8
        }).then((response) => {

            this.setState({
                videos: this.state.videos.concat(response.data.items),
                hasMore: true,
                nextPageToken: response.data.nextPageToken
            });

        });
    }

    handleSearch() {

    }

    componentDidMount() {
    }

    componentWillMount() {
        this.appService.getVideos({maxResults: 8}).then((response) => {

            this.setState({
                videos: response.data.items,
                hasMore: true,
                nextPageToken: response.data.nextPageToken
            });

            this.props.spinning(false);
        });
    }

    render() {
        return (
            <div>
                <InfiniteScroll
                    initialLoad={false}
                    pageStart={0}
                    loadMore={this.handleLoadVideos}
                    hasMore={this.state.hasMore}
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
                        dataSource={this.state.videos}
                        renderItem={video => (
                            <List.Item key={video.id}>
                                <Card
                                    style={{width: 300}}
                                    cover={<img alt="example"
                                                src={video.snippet.thumbnails.medium.url}/>}
                                    actions={[<Icon type="heart"/>, <Icon type="eye"/>,
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
    spinning: PropTypes.func
};

export default connect()(VideoList);
