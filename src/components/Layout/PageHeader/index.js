import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {
    Input,
    Menu,
    Icon,
    Avatar,
    Layout
} from 'antd';
import * as _ from 'lodash';
import * as firebase from 'firebase';
import firebase_config from '../../../config/firebase';
import {streaks, killCombos} from "../../../data/menu";
import {capitalize} from "../../../utils/index";
import styles from './index.css';

const {Header} = Layout;

class PageHeader extends React.Component {
    constructor(props) {
        super(...props);

        this.state = {
            currentMenu: 'menu',
            heroes: []
        }
    }

    static proptypes = {
        onSearch: PropTypes.func
    };

    componentWillMount() {
        firebase.initializeApp(firebase_config);

        const heroesRef = firebase.database().ref().child('heroes');

        heroesRef.once('value').then((snapshot) => {
            this.setState({
                heroes: snapshot.val()
            });
        });
    }

    createMenuHeroes = () => {
        return _.map(_.groupBy(this.state.heroes, "afiliation"), (listHeroes, title) => {
            return (
                <Menu.SubMenu key={'menu' + title} title={capitalize(title)}>
                    {
                        _.map(_.groupBy(listHeroes, "attribute"), (list2, title2) => {

                            return (
                                <Menu.SubMenu key={'menu' + title2} title={capitalize(title2)}>
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
    };

    handleSearch = (event) => {

        if (event.key === "Enter") {
            this.props.onSearch(event);
        }

    };

    handleClickMenu = () => {
    };

    render() {
        const menuKillCombos = killCombos.map((item) => {
            return (<Menu.Item key={item.key}><Icon type="double-right"/>{item.name}</Menu.Item>);
        });
        const menuStreaks = streaks.map((item) => {
            return (<Menu.Item key={item.key}><Icon type="double-right"/>{item.name}</Menu.Item>);
        });

        return (
            <Header className={styles.menuHeader}>
                <div className="logo"/>
                <Input
                    placeholder="Search videos"
                    prefix={<Icon type="search" style={{color: 'rgba(0,0,0,.25)'}}/>}
                    onKeyPress={this.handleSearch}
                />
                <Menu
                    onClick={this.handleClickMenu}
                    selectedKeys={[this.state.currentMenu]}
                    mode="horizontal"
                >
                    <Menu.Item key="home">
                        <Icon type="home"/>Home
                    </Menu.Item>

                    <Menu.SubMenu title={<span><Icon type="user-delete"/>Hero kills</span>}>
                        <Menu.SubMenu title="Streaks">
                            {menuStreaks}
                        </Menu.SubMenu>
                        <Menu.SubMenu title="Kill combos">
                            {menuKillCombos}
                        </Menu.SubMenu>
                    </Menu.SubMenu>

                    <Menu.SubMenu title={<span><Icon type="contacts"/>Heroes</span>}>
                        {this.createMenuHeroes()}
                    </Menu.SubMenu>

                </Menu>
            </Header>
        )
    }
}

export default connect()(PageHeader);
