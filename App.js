import React, { useState, useEffect } from 'react';
import { Map, Marker } from 'react-amap';
import './App.css';
import axios from 'axios';
// const mockData = [
//   {
//     id: 1,
//     address: '吉林省长春市九台区碧水尚城小区4号楼',
//     publish_time: '2021',
//     text: '抗疫求助【现居住址】九台区碧水尚城小区4号楼【电话】 13596076276【求助详情】孩子患有先天性癫痫病，马上要没药了，药再吉大一院附近拿，需要运到九台，疫情期间，我们出不去，孩子不能断药啊，一旦断药，后果不堪设想！求求好心人帮帮我吧！谢谢你们了，我一个普通老百姓，实在没有办法了！急急急',
//     contact: '138888888',
//     longitude: 125.8428733,
//     latitude: 44.14757592,
//   }
// ]

function App() {
  const [ activeCard, setActiveCard ] = useState( -1 )
  const [ center, setCenter ] = useState( { longitude: 121.473701, latitude: 31.230416 } )
  const [ mockData, setMockData ] = useState([ ])
  // const [ zoom_level, setZoom ] = useState( 5 )
  var zoom_level = 15;

  const plugins = [
    
    'Scale',
    
    'ControlBar', // v1.1.0 新增
    
  ]
  

  const getData = () => {
    let url = 'http://101.34.13.166/api/api/cmap'
    const mockData = [
        {
          id: 4757493437695600,
          address: '上海市长宁区新华路街道华山路1220弄',
          publish_time: '4/14 6PM',
          text: '抗疫求助上海抗疫求助上海抗疫求助【所在城市】上海市【求助描述】小区自4/4核酸检测出阳性患者，由于居住环境均为煤卫合用，大部分人无法做到“足不出户”，居家隔离严重不符合隔离条件。自第一例阳性确诊后，已有近一半以上的人员造成感染，每日均有新增抗原阳性和出现不同程度高烧的人群。一周多以来没能进行集中隔离，且无人对环境进行消杀。小区内居民每日惶恐不安。同时，小区内有长期重症尿毒症患者，没有接种过任何疫苗，如一旦感染，即威胁生命。【救助诉求】恳请尽快安排对阳性患者接出小区，进行集中隔离，对小区环境进行消杀。【现居地址】上海市长宁区新华路街道华山路1220弄（更新街道）【电话】18017044664上海抗疫求助 ',
          contact: '138888888',
          longitude: 121.433416,
          latitude: 31.210613
        },

        {
          id: 4757487734227940,
          address: '吉林省长春市南关区国信中央新城',
          publish_time: '4/14 6PM',
          text: '抗疫求助 【所在城市】：吉林省长春市【现居地址】：长春市南关区国信中央新城【联系方式】：17790092968【求助描述】：需要胰岛素优思灵50r，家里三人都需要用，快断药了，问了吉林大药房没有，美团饿了么京东都看了没有，谢谢',
          contact: '138888888',
          longitude: 125.309610,
          latitude: 43.795126
        },

        {
          id: 4757478195333320,
          address: '上海市',
          publish_time: '4/14 6PM',
          text: '抗疫求助 上海普陀 这个药在哪能快点买到或者谁有多的吗 我爸的已经用完了 益药一直在审核中审核中。。。。 ',
          contact: '138888888',
          longitude: 121.473701,
          latitude: 31.230416
        },


      
    ]
    // axios.get(url).then(res => {
    //   console.log(res)
    //   res.data.forEach(item => {
    //     mockData.push({
    //       id: item.id,
    //       address: item.address,
    //       publish_time: item.publish_time,
    //       text: item.text,
    //       contact: item.contact,
    //       longitude: item.longitude,
    //       latitude: item.latitude,
    //     })
    //   })
    //   (mockData)setMockData
    // })

    setMockData(mockData)
  }



  const onClickCard = ( item ) => {
    if ( item.id !== activeCard ) {
      setActiveCard( item.id );
      setCenter( { longitude: item.longitude, latitude: item.latitude } )
      console.log( center )



      // setZoom (20);
      // console.log( zoom_level );
    }
    else {
      setActiveCard( -1 )
    }

  }

  const events = {
    created: ( ins ) => { console.log( ins ); },
    click: ( e ) => {
      console.log( e )
      let a = e.target.w.extData.item
      console.log( a )
      if ( a.id !== activeCard ) {
        scrollTo( a.id )
        setActiveCard( a.id )
        setCenter( { longitude: a.longitude, latitude: a.latitude } )



      // setZoom (20);
      // console.log( zoom_level )
      }
      else {
        setActiveCard( -1 )
      }
    }
  }
  const scrollTo = ( id ) => {
    let anchorElement = document.getElementById( id )
    if ( anchorElement ) {
      console.log( anchorElement )
      anchorElement.scrollIntoView( { alignToTop: true } )
    }
  }
  useEffect( () => {
    getData()
    
  }, [] )

  return (
    <div className='page'>
      <div className="List">
        <div className='Title'>防疫求助信息</div>
        {
          mockData.map( item => <div className={ item.id === activeCard ? 'ActiveCard' : 'Card' } onClick={ () => onClickCard( item ) }>
            <div style={ { display: 'flex', justifytext: 'space-between' } }>
              <div className={ item.id === activeCard ? 'ActiveLocation' : "Location" }>{ item.address }</div>
              <div className='publish_time'>{ item.publish_time }</div>
            </div>
            <div className={item.id === activeCard ? 'ActiveContact' : 'Contact' }> { item.contact }</div>

            {/* <a ref="https://m.weibo.cn/statuses/extend?id=" className={item.id === activeCard ? 'ActiveLink' : 'Link'}> 查看微博</a> */}
            
            <div style={ { display: 'flex', justifytext: 'space-between' } }>
              <div className={ item.id === activeCard ? 'ActiveDiscrption' : 'Discrption' }>{ item.text }</div>
              <a id={ item.id }></a>
              <div>{ item.id === activeCard ? <span class="iconfont icon-arrow-down" /> : <span class="iconfont icon-arrow-up" /> }</div>
              
            </div>

          </div>
          )
        }

      </div>
      <div className='Duty'>
       <strong>免责声明：</strong>凡在本网站出现的信息，均来自微博超话且仅供参考。不保证有关资料的可靠性与准确性。本网站对有关资料引致的错误、不确或遗漏、概不负任何法律责任（包括侵权、合同和其他责任）。
      </div>
      <div className='Map'>
        <Map amapkey={ '788e08def03f95c670944fe2c78fa76f' } center={ center } zoom={ zoom_level } plugins={plugins} >
          { mockData.map( item => <Marker position={ { longitude: item.longitude, latitude: item.latitude } } clickable events={ events } extData={ { "item": item } } /> ) }
        </Map>
      </div>
    </div>
  );
}

export default App;
