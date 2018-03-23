import React from 'react';
import {connect} from 'dva';
import {
    Layout,
    Menu,
    Divider,
    Icon,
    Input,
    Avatar,
    Spin
} from 'antd';
import * as firebase from 'firebase';
import firebase_config from '../config/firebase';
import * as _ from 'lodash';
import VideoList from '../components/VideoList';

const {Header, Content, Footer} = Layout;

const data_menu = {
    streaks: [
        {key: "001", name: "Killing Spree"},
        {key: "002", name: "Dominating"},
        {key: "003", name: "Mega Kill"},
        {key: "004", name: "Monster Kill"},
        {key: "005", name: "Unstoppable"},
        {key: "006", name: "Wicked Sick"},
        {key: "007", name: "Godlike"},
        {key: "008", name: "Beyond Godlike"}
    ],
    kill_combos: [
        {key: "009", name: "Double kill"},
        {key: "010", name: "Triple Kill"},
        {key: "011", name: "Ultra Kill"},
        {key: "012", name: "Rampage"}
    ]
};

const styles = {
    menuHeader: {
        //position: 'fixed',
        width: '100%',
        backgroundColor: "white"
    },
    content: {
        padding: '0 50px',
        marginTop: 40
    },
    contentDiv: {
        background: '#fff',
        padding: 24,
        minHeight: 380
    }
};


class IndexPage extends React.Component {

    constructor(props) {
        super(...props);

        this.state = {
            currentMenu: 'home',
            heroes: [],
            spinningActive: false,
            query: ""
        };

        this.handleSpinning = this.handleSpinning.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    componentDidMount() {
        firebase.initializeApp(firebase_config);

        const heroesRef = firebase.database().ref().child('heroes');

        heroesRef.once('value').then((snapshot) => {
            this.setState({
                heroes: snapshot.val()
            });
        });
    }

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
                query: event.target.value
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

    onSearchVideos() {
        return ''
    }

    capitalize(str) {
        return str.replace(/\b\w/g, l => l.toUpperCase());
    }

    createMenuHeroes() {
        return _.map(_.groupBy(this.state.heroes, "afiliation"), (listHeroes, title) => {
            return (
                <Menu.SubMenu key={'menu' + title} title={this.capitalize(title)}>
                    {
                        _.map(_.groupBy(listHeroes, "attribute"), (list2, title2) => {

                            return (
                                <Menu.SubMenu key={'menu' + title2} title={this.capitalize(title2)}>
                                    {
                                        list2.map((hero) => {
                                            const url = "https://firebasestorage.googleapis.com/v0/b/the-baltazartv-dota-1.appspot.com/o/heroes%2F" + hero.id + ".png?alt=media&token=f2add21a-3458-4bd6-9c1f-f0d4ad10c620"
                                            return <Menu.Item key={hero.id}>
                                                <Avatar style={{marginRight: 12}} shape="square" size="large"
                                                        src={url}/>
                                                {`${hero.name} (${hero.hero})`}
                                            </Menu.Item>
                                        })
                                    }
                                </Menu.SubMenu>
                            )
                        })
                    }
                </Menu.SubMenu>
            )
        });
    }

    render() {
        return (
            <Layout className="layout" style={{width: '100%', height: '100%'}}>
                <Header style={styles.menuHeader}>

                    <div className="logo"/>
                    <Menu
                        onClick={this.handleClickMenu}
                        selectedKeys={[this.state.currentMenu]}
                        mode="horizontal"
                    >
                        <Menu.Item key="search">
                            <Input
                                placeholder="Search videos"
                                prefix={<Icon type="search" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                onKeyPress={this.handleSearch}
                            />
                        </Menu.Item>

                        <Menu.Item key="home">
                            <Icon type="home"/>Home
                        </Menu.Item>

                        <Menu.SubMenu title={<span><Icon type="user-delete"/>Hero kills</span>}>
                            <Menu.SubMenu title="Streaks">
                                {
                                    data_menu.streaks.map((item) => {
                                        return <Menu.Item key={item.key}>
                                            <Icon type="double-right"/>{item.name}</Menu.Item>
                                    })
                                }
                            </Menu.SubMenu>
                            <Menu.SubMenu title="Kill combos">
                                {
                                    data_menu.kill_combos.map((item) => {
                                        return <Menu.Item key={item.key}>
                                            <Icon type="double-right"/>{item.name}</Menu.Item>
                                    })
                                }
                            </Menu.SubMenu>
                        </Menu.SubMenu>

                        <Menu.SubMenu title={<span><Icon type="contacts"/>Heroes</span>}>
                            {this.createMenuHeroes()}
                        </Menu.SubMenu>

                    </Menu>
                </Header>

                <Divider/>

                <Spin spinning={this.state.spinningActive} size={'large'}>
                    <Content style={styles.content}>
                        <div style={styles.contentDiv}>
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

IndexPage.propTypes = {};

export default connect()(IndexPage);
