import React from 'react';
import {connect} from 'dva';
import {Divider, Layout, Spin} from 'antd';
import VideoList from '../components/VideoList';
import PageHeader from '../components/Layout/PageHeader';
import PageFooter from '../components/Layout/PageFooter';
import * as styles from './IndexPage.css'
import {killCombos, streaks} from "../data/menu";
import * as _ from 'lodash';

const {Content} = Layout;
const data_menu = [...streaks, ...killCombos];


class IndexPage extends React.Component {

    constructor(props) {
        super(...props);

        this.state = {
            spinningActive: false,
            query: ""
        };

        this.handleSpinning = this.handleSpinning.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    static propTypes = {};

    componentWillMount() {
        this.setState({
            spinningActive: true
        });
    }

    handleSearch = (event) => {
        if (event.key === "Enter") {
            const {dispatch} = this.props;

            const querySearch = event.target.value;

            return dispatch({
                type: 'video/search',
                payload: {query: querySearch}
            });
        }
    };

    handleClickMenu = (event, keyMenuActive) => {
        const {dispatch} = this.props;

        if (keyMenuActive !== event.key) {
            if (event.key === "home") {

                return dispatch({
                    type: 'video/fetch'
                });
            }
            else {
                const index = _.findIndex(data_menu, function (o) {
                    return o.key === event.key;
                });

                if (index !== -1) {
                    return dispatch({
                        type: 'video/search',
                        payload: {query: data_menu[index].name}
                    });
                }
            }
        }

    };

    handleSpinning = (status) => {
        this.setState({
            spinningActive: status
        });
    };

    render() {
        return (
            <Layout className="layout" style={{width: '100%', height: '100%'}}>
                <PageHeader onSearch={this.handleSearch} onClickMenu={this.handleClickMenu}/>

                <Divider/>

                <Spin spinning={this.state.spinningActive} size={'large'}>
                    <Content className={styles.content}>
                        <div className={styles.contentDiv}>
                            <VideoList spinning={this.handleSpinning}/>
                        </div>
                    </Content>
                </Spin>

                <PageFooter/>
            </Layout>
        );
    }
}

export default connect()(IndexPage);
