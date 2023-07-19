import React from "react";
import { ResponsiveBar } from "@nivo/bar";

const TodoChart = () => {
  const data = [
    { bottle: "365ml", cola: 1200, cidar: 1000, fanta: 1100 },
    { bottle: "500ml", cola: 2200, cidar: 2000, fanta: 2100 },
    { bottle: "1000ml", cola: 3200, cidar: 3000, fanta: 3100 },
  ];
  return (
    <div className="p-6 mt-5 shadow rounded bg-white">
      <h2>TodoChart</h2>
      <div style={{ height: "400px" }}>
        <ResponsiveBar
          data={data}
          // chart 에서 보여질 데이터 키
          keys={["cola", "cidar", "fanta"]}
          // keys 를 그룹화 하는 index key
          indexBy="bottle"
          //차트간의 여백
          padding={0.3}
          //차트의 색상
          colors={["olive", "blue", "green"]}
          //색상 적용
          colorBy="id"
          //테마 설정
          theme={[
            //lable 스타일(bar 에 표현되는 글씨)
            {
              labels: {
                text: {
                  fontSize: 14,
                  fill: "#000000",
                },
              },
              //legend 스타일 (우측하단에 있는 색상별 Key 표시)
              legends: {
                text: {
                  fontSize: 10,
                  fill: "#ff0000",
                },
              },
              //axios legend 스타일 (bottom, left 글씨)
              axios: {
                legend: {
                  text: {
                    fontSize: 20,
                    fill: "#ffff00",
                  },
                },
                ticks: {
                  text: {
                    fontSize: 16,
                    fill: "#0000ff",
                  },
                },
              },
            //   axios bottom 설정
            //   axiosBottom = 
            },
          ]}
          //axios Bottom 설정
          axiosBottom={{
            tickSize: 5,
            ticPadding: 5,
            ticRotation:0,
          }}
          enableGridY={true}
          enableLabel={false}
        />
      </div>
    </div>
  );
};

export default TodoChart;
