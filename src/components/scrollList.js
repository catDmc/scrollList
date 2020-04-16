import React from 'react';
import {Button, Calendar,List, Avatar} from 'antd';
import styles from './list.scss';

let scrollInterval='';
export default class ScrollList extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            data:[
              {
                title: '新零售技术事业群-Node.js C++ 开发专家-淘系技术部',
              },{
                title: '新零售技术事业群-软硬件技术专家-淘系技术部',
              },{
                title: '蚂蚁集团-安全专家/高级安全专家',
              },{
                title: '联盟-本地化产品运营',
              },{
                title: '新零售技术事业群- 前端技术专家（IDE方向）-淘系技术部',
              },{
                title: '阿里集团-社区-UGC社区运营专家',
              },
            ],
            listMarginTop:"0",
            animate:false,
            
          }
    }
  
  scrollDown= e =>{
    let ulNode=document.getElementById("scrollList").getElementsByTagName("ul")[0];
    ulNode.firstChild.classList.remove(styles.opacityAnimation);
    this.setState({ 
      animate: true ,
      listMarginTop: "-"+ulNode.lastChild.scrollHeight+"px"
    }); 
    setTimeout(() => { 
      this.state.data.unshift(this.state.data[this.state.data.length-1]);
      ulNode.firstChild.classList.add(styles.opacityAnimation);
      this.state.data.pop();    
      this.setState({ 
        animate: false, 
        listMarginTop: "0",
      }); 
      this.forceUpdate();
    }, 1000)
  }
  
  
  startScrollDown= e =>{
    this.endScroll();
    this.scrollDown();
    scrollInterval=setInterval(this.scrollDown, 3000);
  }
  
  endScroll= e =>{
     clearInterval(scrollInterval);
  }
  componentDidMount(){
		this.startScrollDown();
	}
 
	render () { 
		return ( 
			<div> 
        <div className={styles.morePposition}>
          <div className={styles.leftTitle}>最新职位</div>
          <div className={styles.leftRight}>
            <a style={{color:'#3c99D8'}} href="https://job.alibaba.com/zhaopin/index.htm">更多</a>
          </div>
        </div>
        <div className={styles.listContainer}
          onMouseOver={this.endScroll}
          onMouseLeave={this.startScrollDown}>
          
            <List
                itemLayout="horizontal"
                id="scrollList"
                style={{marginTop:this.state.listMarginTop}}
                className={this.state.animate ? "animate" : ''}
                dataSource={this.state.data}
                renderItem={item => (
                    <List.Item>
                    <List.Item.Meta
                        title={<a style={{color:'#3c99D8'}} href="https://job.alibaba.com/zhaopin/index.htm">{item.title}</a>}
                    />
                    </List.Item>
                )}
            />
        </div>
			</div> 
		) 
	} 
  }