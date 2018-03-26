import React from 'react';
import {connect} from 'dva';
import {
    Layout,
    Divider,
    Spin
} from 'antd';
import VideoList from '../components/VideoList';
import PageHeader from '../components/Layout/PageHeader';
import * as styles from './IndexPage.css'

const {Content, Footer} = Layout;


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

    handleClickMenu = (e) => {
        console.log('click ', e);
        this.setState({
            currentMenu: e.key,
        });
    };

    handleSearch = (event) => {
        if (event.key === "Enter") {
            this.setState({
                query: event.target.value,
                currentMenu: null
            });
        }
    };

    handleSpinning(status) {
        this.setState({
            spinningActive: status
        });
    }

    createFooter = () => {
        const current_year = new Date().getFullYear();
        return `The BaltazarTv App ©${ current_year } Created by `;
    };

    render() {
        return (
            <Layout className="layout" style={{width: '100%', height: '100%'}}>
                <PageHeader onSearch={this.handleSearch}/>
                <Divider/>

                <Spin spinning={this.state.spinningActive} size={'large'}>
                    <Content className={styles.content}>
                        <div className={styles.contentDiv}>
                            <VideoList spinning={this.handleSpinning} querySearch={this.state.query}/>
                        </div>
                    </Content>
                </Spin>

                <Footer style={{textAlign: 'center'}}>
                    {this.createFooter()}
                    <a href="http://github.com/hostelix">Hostelix ♥</a>
                </Footer>
            </Layout>
        );
    }
}

export default connect()(IndexPage);
