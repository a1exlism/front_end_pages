function getTeamScoreInfo(){$.ajax({url:contestSolvedUrl,type:"GET",data:{contestId:contestId},success:function(a){0==a.error_code&&(jsonData=a.response_data,echart_click(jsonData))},error:function(){}})}function dateconvert(a){var b="YYYY-MM-DD hh:mm:ss",c=laydate.now(new Date(a).getTime(),b);return c}function GetDateT(){var a,b;return a=new Date,b=a.getFullYear()+" ",b+=a.getMonth()+1<10?"0"+(a.getMonth()+1)+",":a.getMonth()+1+",",b+=a.getDate()<10?"0"+a.getDate()+" ":a.getDate()+" ",b+=a.getHours()<10?"0"+a.getHours()+":":a.getHours()+":",b+=a.getMinutes()+":",b+=a.getSeconds()}function echart_click(a){startTime=a.startTime,endTime=a.endTime,a=a.infoList;var b=[],c=echarts.init(document.getElementById("main_echart")),d=[],e=[],f=new Date,g=["#ff7f50","#87cefa","#da70d6","#32cd32","#6495ed","#ff69b4","#ba55d3","#cd5c5c","#ffa500","#40e0d0","#1e90ff","#ff6347","#7b68ee","#00fa9a","#ffd700","#6699FF","#ff6666","#3cb371","#b8860b","#30e0e0"];for(i=0;i<a.length;i++){for(b.push({name:a[i].teamName,textStyle:{color:g[i]}}),e=[],dateTime=new Date(dateconvert(startTime)),e.push([dateTime,0]),j=0;j<a[i].data.length;j++){dateTime=new Date(dateconvert(a[i].data[j].time));var h=0;for(k=0;k<=j;k++)h=a[i].data[k].score+h;e.push([dateTime,h])}f>new Date(dateconvert(endTime))?dateTime=new Date(dateconvert(endTime)):dateTime=f,e.push([dateTime,e[e.length-1][1]]),temp={name:a[i].teamName,type:"line",data:e},d.push(temp)}option={title:{text:gettext("比赛"),textStyle:{color:"white"},x:"center"},tooltip:{trigger:"item",padding:10,formatter:"{a} <br/>{b} : {c}"},color:g,legend:{x:"right",orient:"vertical",data:b},xAxis:[{type:"time",name:gettext("时间"),nameTextStyle:{fontSize:15,color:"#fff"},splitNumber:10,splitLine:{show:!1},axisLabel:{textStyle:{color:"#fff",fontSize:15}},boundaryGap:[0,100],axisLine:{lineStyle:{color:"#fff",width:2}}}],yAxis:[{type:"value",name:gettext("得分"),nameTextStyle:{fontSize:15,color:"#fff"},splitLine:{show:!1},axisLabel:{textStyle:{color:"#fff",fontSize:15}},axisLine:{lineStyle:{color:"#fff",width:2}}}],calculable:!0,series:d,animation:!1},c.setOption(option)}function getExamPieInfoT(){$.ajax({url:examPieUrl,type:"GET",data:{contestId:contestId},success:function(a){0==a.error_code&&getExamPieInfo(a)},error:function(){}})}function getColor(a,b,c){return 0==c?titleColor[a][(b+1)%2]:1==c?titleColor[a][(b+1)%2]+"B2":2==c?titleColor[a][(b+1)%2]+"5F":0==b?color[a]:titleColor[a][b%2]}function getExamPieInfo(){$.ajax({url:contestsolvedPieUrl,type:"GET",data:{contestId:contestId},success:function(a){0==a.error_code&&contestPieInfo(a)},error:function(){}})}function getSolvedRecord(){$.ajax({url:contestsolvedRecordUrl,type:"GET",data:{contestId:contestId},success:function(a){if(0==a.error_code){data=a.response_data,$("#recordListDiv").empty();for(var b=0;b<data.length;b++){var c=$("#templet").clone();$(c).show(),$("#infoA",$(c)).html(data[b].teamName+"  "+gettext("解出了")+"  "+data[b].taskName),$("#time",$(c)).html(dateconvert(data[b].create_time).substring(10)),$("#recordListDiv").append(c)}}},error:function(){}})}function contestPieInfo(a){var b=echarts.init(document.getElementById("pie_echart")),c=[],d=[],e=[],f=[],g=["first blood","second blood","third blood"],h=[],l=[],m=[];for(i=0;i<a.response_data.length;i++)for(l.push(getColor(i,0)),ques=a.response_data[i].questions,f.push(a.response_data[i].name),temp={value:ques.length,name:a.response_data[i].name},c.push(temp),j=0;j<ques.length;j++)for(m.push(getColor(i,j+1)),f.push(ques[j].name),tempQ={value:3,name:ques[j].name,rank:gettext("有")+" "+ques[j].slovedCount+" "+gettext("个队伍解出")},d.push(tempQ),tLength=ques[j].teams.length,k=0;k<3;k++)team=ques[j].teams[k],null==team&&(team="?"),tempT={value:1,name:team,rank:g[k]},h.push(getColor(i,j,k)),e.push(tempT);option={tooltip:{trigger:"item",formatter:function(a,b,c){var d=a.data.rank;return d}},toolbox:{show:!0,feature:{mark:{show:!0},dataView:{show:!0,readOnly:!1},magicType:{show:!0,type:["pie","funnel"]},restore:{show:!0},saveAsImage:{show:!0}}},calculable:!1,textStyle:{fontSize:15},series:[{name:gettext("赛题类型"),type:"pie",radius:[0,"35%"],x:"20%",width:"40%",funnelAlign:"right",max:1548,itemStyle:{normal:{label:{position:"inner",textStyle:{color:"#000000",fontWeight:"bold"}},labelLine:{show:!1},color:function(a){return l.shift()}}},data:c},{name:gettext("赛题信息"),type:"pie",radius:["40%","65%"],x:"60%",width:"35%",funnelAlign:"left",max:2,itemStyle:{normal:{label:{position:"inner",textStyle:{color:"#000000",fontWeight:"bold"}},color:function(a){return m.shift()}}},data:d},{name:gettext("解题情况"),type:"pie",radius:["70%","100%"],x:"60%",width:"35%",funnelAlign:"left",max:2,itemStyle:{normal:{label:{rotate:!0,position:"inner",textStyle:{color:"#000000",fontWeight:"bold"}},color:function(a){return h.shift()}},emphasis:{color:function(a){return"#000000"}}},data:e}]},b.setOption(option)}var color=["#B54848","#48B5AD","#B57448","#4848B5","#B5AD48","#7B48B5","#96B548","#B54899","#48B581"],titleColor=[["#C95050","#FF6464"],["#50C9C2","#64FFFB"],["#C9814F","#FFA364"],["#5050CA","#6464FF"],["#C9C350","#FFFB64"],["#8D50C9","#BB64FF"],["#A0C94F","#C6FF64"],["#CA50A5","#FF64C9"],["#50C993","#64FFBD"]];