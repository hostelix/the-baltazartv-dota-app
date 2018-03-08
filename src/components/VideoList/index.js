import React from 'react';
import {Col, Row, Card, Icon, Avatar} from 'antd';
import {connect} from 'dva';
import AppService from '../../services/app';
import * as _ from 'lodash';

const {Meta} = Card;

class VideoList extends React.Component {
    constructor(props) {
        super(...props);

        this.state = {
            videos: []
        };

        this.appService = new AppService();
    }

    componentDidMount() {
        this.appService.getRecentVideos().then((response) => {
            this.setState({
                videos: response.data.items,
            });

            this.props.spinning(false);
        });
    }

    renderVideos() {

    }

    render() {
        return (
            <div>
                {
                    _.chunk(this.state.videos, 4).map((videoList) => {
                        return (
                            <Row gutter={16} style={{marginTop: 20}}>
                                {
                                    videoList.map((video) => {
                                        return (
                                            <Col span={6}>
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
                                            </Col>
                                        )
                                    })
                                }
                            </Row>
                        )
                    })
                }
            </div>
        )
    }
}

VideoList.propTypes = {
    spinning: Function
};

export default connect()(VideoList);
