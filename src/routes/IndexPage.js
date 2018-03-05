import React from 'react';
import {connect} from 'dva';
import {Layout, Menu, Divider, Icon, Input} from 'antd';

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


class IndexPage extends React.Component {

    constructor(props) {
        super(...props);

        this.state = {
            current: 'home',
        };
    }

    handleClickMenu = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    };

    createFooter() {
        const current_year = new Date().getFullYear();
        return `The BaltazarTv App ©${ current_year } Created by `;
    }

    onSearchVideos() {
        return ''
    }

    render() {
        return (
            <Layout className="layout" style={{width: '100%', height: '100%'}}>
                <Header style={{width: '100%', "background-color": "white"}}>

                    <div className="logo"/>
                    <Menu
                        onClick={this.handleClickMenu}
                        selectedKeys={[this.state.current]}
                        mode="horizontal"
                    >
                        <Menu.Item key="search">
                            <Input
                                placeholder="Search videos"
                                prefix={<Icon type="search" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                onChange={this.onSearchVideos}
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
                            <Menu.ItemGroup title="Item 1">
                                <Menu.Item key="setting:1">Option 1</Menu.Item>
                                <Menu.Item key="setting:2">Option 2</Menu.Item>
                            </Menu.ItemGroup>
                            <Menu.ItemGroup title="Item 2">
                                <Menu.Item key="setting:3">Option 3</Menu.Item>
                                <Menu.Item key="setting:4">Option 4</Menu.Item>
                            </Menu.ItemGroup>
                            <Menu.SubMenu key="sub3" title="Submenu">
                                <Menu.Item key="7">Option 7</Menu.Item>
                                <Menu.Item key="8">Option 8</Menu.Item>
                            </Menu.SubMenu>
                        </Menu.SubMenu>

                    </Menu>
                </Header>

                <Divider>With Text</Divider>

                <Content style={{padding: '0 50px'}}>
                    <div style={{background: '#fff', padding: 24, minHeight: 280}}>Content</div>
                </Content>

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
