<script setup>
import { onMounted, ref } from "vue";
import { useUserStore } from "@/stores/user";
import { getUserChatListAPI, getMessageAPI } from "@/apis/chat";
const userStore = useUserStore();
const userInfo = ref(userStore.userInfo.userInfoVo);
// let websocket = new WebSocket("ws://127.0.0.1:7886/websocket");
const ws = new WebSocket(`ws://127.0.0.1:7886/websocket`);
const msg = ref({
  linkId: 0,
  fromUser: userInfo.value.id,
  toUser: 0,
  content: "",
  sendTime: new Date(),
});
const msgList = ref([]);
const userList = ref([]);
const getUserChatList = async () => {
  const res = await getUserChatListAPI();
  userList.value = res.data;
};

const init = () => {
  if (typeof WebSocket === "undefined") {
    alert("您的浏览器不支持socket");
  } else {
    //  //连接发生错误的回调方法
    ws.onerror = function () {
      console.log("ws连接发生错误");
    };
    //连接成功建立的回调方法
    ws.onopen = function () {
      console.log("ws连接成功");
    };
    //接收到消息的回调方法
    ws.onmessage = function (event) {
      console.log(event.data);
      const message = JSON.parse(event.data);
      msgList.value.push(message);
      console.log(msgList.value);
    };
    //连接关闭的回调方法
    ws.onclose = function () {
      console.log("ws连接关闭");
    };
  }
};

const send = () => {
  if (typeof WebSocket == "undefined") {
    console.log("您的浏览器不支持WebSocket");
  } else {
    msg.value.toUser = params.value.toUser;
    msg.value.sendTime = new Date();
    msg.value.linkId = params.value.linkId;
    ws.send(JSON.stringify(msg));
    msg.value.content = "";
  }
};
const nulls = -1;
const params = ref({
  toUser: 0,
});
const getMessage = async () => {
  const res = await getMessageAPI(params);
  msgList.value = res.data;
};

const tabChange = (type) => {
  console.log(userList.value[type].toUser);
  params.value.toUser = userList.value[type].toUser;
  params.value.linkId = userList.value[type].linkId;
  getMessage();
};
const getDateTimeCST = (date, desp1, desp2, desp3) => {
  const str = date;
  const _date = new Date(new Date(str).toISOString().replace("Z", "-08:00"));
  return _date
    .toISOString()
    .slice(0, 19)
    .replace(/[-]/g, desp1)
    .replace("T", desp2)
    .replace(/[:]/g, desp3);
};

onMounted(() => {
  init();
  getUserChatList();
  getMessage();
});
</script>

<template>
  <div>
    <el-row style="width: 100%">
      <!--      用户列表-->
      <el-col :span="6">
        <el-card style="width: 100%; height: 800px">
          <div
            style="text-align: center; font-size: 28px; margin-bottom: 10px"
          ></div>
          <div>
            <el-tabs
              v-model="nulls"
              @tab-change="tabChange"
              tab-position="left"
              style="height: 200px"
              class="demo-tabs"
            >
              <el-tab-pane
                v-for="user in userList"
                :label="user.nickName"
                :key="user.linkId"
              />
            </el-tabs>
          </div>
        </el-card>
      </el-col>
      <!--      聊天室-->
      <el-col :span="18">
        <div style="width: 100%">
          <el-card style="width: 100%; height: 800px">
            <div
              style="text-align: center; font-size: 28px; margin-bottom: 10px"
            >
              {{}}
            </div>
            <div
              style="
                width: 100%;
                height: 550px;
                border: 1px solid #000000;
                border-radius: 5px;
                overflow-y: auto;
                margin-bottom: 10px;
              "
            >
              <div v-for="message in msgList" :key="message.messageId">
                <div
                  class="msg"
                  align="right"
                  v-if="message.fromUser === userInfo.id"
                  style="color: dodgerblue"
                >
                  {{
                    getDateTimeCST(message.sendTime, "-", " ", ":")
                  }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-tag size="mini">{{
                    message.fromUserName
                  }}</el-tag
                  ><br />{{ message.content }}&nbsp;&nbsp;
                </div>
                <div
                  class="msg"
                  align="left"
                  v-if="message.toUser === userInfo.id"
                  style="color: coral"
                >
                  <el-tag size="mini" type="danger">{{
                    message.fromUserName
                  }}</el-tag>
                  {{
                    getDateTimeCST(message.sendTime, "-", " ", ":")
                  }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br />&nbsp;&nbsp;{{
                    message.content
                  }}
                </div>
              </div>
            </div>
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4 }"
              placeholder="请输入聊天内容"
              v-model="msg.content"
            ></el-input>
            <div align="right">
              <el-button type="primary" style="margin-top: 10px" @click="send"
                >发送</el-button
              >
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<style>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.el-tabs--right .el-tabs__content,
.el-tabs--left .el-tabs__content {
  height: 100%;
}
.user {
  border: 0ch;
  background-color: white;
  display: block;
  line-height: 1;
  padding: 15px 0;
  font-size: 14px;
  color: #666;
  position: relative;

  &:hover {
    color: hsla(160, 100%, 37%, 1);
  }

  &.active,
  &.router-link-exact-active {
    color: hsla(160, 100%, 37%, 1);

    &:before {
      display: block;
    }
  }

  &:before {
    content: "";
    display: none;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    position: absolute;
    top: 19px;
    left: -16px;
    background-color: hsla(160, 100%, 37%, 1);
  }
}
</style>
