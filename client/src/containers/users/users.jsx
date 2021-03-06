import React, {Component} from 'react';
import BScroll from 'better-scroll';
import pubSub from 'pubsub-js';
import {connect} from 'react-redux';
import {Icon, Skeleton, Button } from 'antd';

import './users.css';
import {
  getUsersObjs,
  autoLogin,
} from '../../redux/actions'

// antd中使用iconfont图标引入方法
const MyIcon = Icon.createFromIconfontCN({
  // scriptUrl: '//at.alicdn.com/t/font_1368816_anek3qab0ai.js', // 在 iconfont.cn 上生成s
});

class users extends Component {

  componentDidMount(){
    // 发布消息,nav隐藏 
    pubSub.publish("nav","/users");
    const users = document.getElementById("users");

    this.usersScroll = new BScroll(users, {
      scrollY:true,
      click: true
    })
    this.props.getUsersObjs(this.props.match.params)
}

goBack = () => {
  this.props.history.goBack();
}

toUser = (_id) => {
  this.props.history.push({pathname:'/user/' + _id});
}

  render(){
    if(this.props.usersObjs.length === 0){
      // if(true){
      return (
        <div id='users' className='users-wrapper'>
        <div className='users-content'>
        <Skeleton  avatar active>
      </Skeleton>    
      <Skeleton  avatar active>
      </Skeleton>    
      <Skeleton  avatar active>
      </Skeleton> 
      <Skeleton  avatar active>
      </Skeleton>    
      <Skeleton  avatar active>
      </Skeleton>    
      <Skeleton  avatar active>
      </Skeleton>   
      </div>
        </div>
      )
    }else{
    return (
      // <div style={{height:"100%"}}>
      <div id='users' className='users-wrapper'>
        <div className='users-container'>
          {
            this.props.usersObjs.map((item, index) => {
              return (
                <div onClick={() => {this.toUser(item._id)}} key={index} className='users-box'>
                  <div className='users-content'>
                    <div className='users-content-avatar'>
                      <img src={item.avatarUrl} alt=""/>
                    </div>
                     <p className='users-nickName'>{item.nickName}&nbsp;{item.sex === 'male' ?  <MyIcon type="icon-male" /> :  <MyIcon type="icon-female" />}</p> 
                  </div>
                  <div className='personal-info'>
                  <div className="personal-info-box" >
                    <p className='personal-info-num'>{item.users ? item.users.length : 0}</p>
                    <p className='personal-info-txt'>关注</p>
                  </div>
                  <div className='personal-line'></div>
                  <div className="personal-info-box ">
                    <p className='personal-info-num'>5</p>
                    <p className='personal-info-txt'>粉丝</p>
                  </div>
                  <div className='personal-line'></div>
                  <div className="personal-info-box">
                    <p className='personal-info-num'>5</p>
                    <p className='personal-info-txt'>卡片</p>
                  </div>
                </div>
            </div>      
              )
            })
          }
 

        </div>
        <Button onClick={this.goBack} id='user-back-btn' shape='circle'  size='large' icon='arrow-left'>
        </Button>
      </div>

      // </div>
    )
  }
  }
}
export default connect(
  state => ({usersObjs:state.usersObjs, user:state.user}),
  {autoLogin, getUsersObjs}
)(users);