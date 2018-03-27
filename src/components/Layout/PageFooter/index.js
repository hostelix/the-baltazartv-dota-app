import React from 'react';
import {connect} from 'dva';
import {Layout} from 'antd';

const {Footer} = Layout;

class PageFooter extends React.Component {
    constructor(props) {
        super(...props);
    }

    render() {
        const current_year = new Date().getFullYear();
        return (
            <Footer style={{textAlign: 'center'}}>
                The BaltazarTv App ©{current_year} Created by &nbsp;
                <a href="http://github.com/hostelix">Hostelix ♥</a>
            </Footer>
        )
    }
}

export default connect()(PageFooter);
