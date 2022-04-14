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
  const [ center, setCenter ] = useState( { longitude: 120, latitude: 35 } )
  const [ mockData, setMockData ] = useState([ ])

  const getData = () => {
    let url = 'http://101.34.13.166/api/api/cmap'
    const mockData = []
    axios.get(url).then(res => {
      console.log(res)
      res.data.forEach(item => {
        mockData.push({
          id: item.id,
          address: item.address,
          publish_time: item.publish_time,
          text: item.text,
          contact: item.contact,
          longitude: item.longitude,
          latitude: item.latitude,
        })
      })
      setMockData(mockData)
    })
  }



  const onClickCard = ( item ) => {
    if ( item.id !== activeCard ) {
      setActiveCard( item.id );
      setCenter( { longitude: item.longitude, latitude: item.latitude } )
      console.log( center )
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
            <div className='Contact'>{ item.contact }</div>
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
        <span>免责声明：</span>凡在本网站出现的信息，均仅供参考。不保证有关资料的可靠性与准确性。本网站对有关资料引致的错误、不确或遗漏、概不负任何法律责任（包括侵权、合同和其他责任）。
      </div>
      <div className='Map'>
        <Map amapkey={ '788e08def03f95c670944fe2c78fa76f' } center={ center } zoom={ 5 } >
          { mockData.map( item => <Marker position={ { longitude: item.longitude, latitude: item.latitude } } clickable events={ events } extData={ { "item": item } } /> ) }
        </Map>
      </div>
    </div>
  );
}

export default App;
