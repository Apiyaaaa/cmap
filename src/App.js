import React, { useState, useEffect } from 'react';
import { Map, Markers } from 'react-amap';
import { List, Avatar } from 'antd';
function App() {
  const [positions, setPositions] = useState();
  const [markers, setMarkers] = useState();

  const data = [
    {
      content: '求助内容',
      address: '地址',
      contact: '联系方式',
      update_time: 'todo',
    }
  ];
  const randomPosition = () => ({
    longitude: 100 + Math.random() * 20,
    latitude: 30 + Math.random() * 20
  })
  const randomMarker = (len) => (
    Array(len).fill(true).map((e, idx) => ({
      position: randomPosition()
    }))
  );

  useEffect(() => {
    setMarkers(randomMarker(10));
  }, [])

  return (

    <div style={{ width: "100%", height: "100%", margin: 'auto',}}>
      <div style={{ border: '1px solid black', width: '400px', height: '100%', position: 'relative', float: 'left', zIndex:'100',backgroundColor: 'rgba(233,233,233,0.7)' }}>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                title={<a href="https://ant.design">{item.content}</a>}
                description={item.address}
              />
              <div>发布时间</div>
              <div>联系方式</div>
            </List.Item>
            
          )}
        />
      </div>

      <div style={{ width: '100%', height: '100%', float: 'left', position: 'absolute', border: '1px solid red' }}>
        <Map amapkey={'788e08def03f95c670944fe2c78fa76f'} center={{ longitude: 115, latitude: 40 }} zoom={4}>
          <Markers
            markers={markers} />
        </Map>
      </div>
    </div>
  );
}

export default App;
