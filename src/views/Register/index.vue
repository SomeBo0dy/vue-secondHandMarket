<script setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";
import "element-plus/theme-chalk/el-message.css";
import { useRouter } from "vue-router";
import { registerAPI } from "@/apis/user";

//表单对象
const form = ref({
  account: "",
  password: "",
  confirm: "",
  phoneNumber: "",
  qqNumber: "",
  agree: true,
});
const userType = "0";

const equalToPassword = (rule, value, callback) => {
  if (form.value.password !== value) {
    callback(new Error("两次输入的密码不一致"));
  } else {
    callback();
  }
};
const checkMobile = (rule, value, callback) => {
  // 手机号正则表达式
  const regMobile =
    /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
  if (regMobile.test(value)) {
    // 合法的手机号
    return callback();
  }
  callback(new Error("请输入合法的手机号"));
};

//规则对象
const rules = {
  account: [{ required: true, message: "账号不得为空", trigger: "blur" }],
  password: [
    { required: true, message: "密码不得为空", trigger: "blur" },
    { min: 6, max: 14, message: "密码长度为6-14个字符", trigger: "blur" },
  ],
  confirm: [
    { required: true, message: "请再次输入您的密码", trigger: "blur" },
    { min: 6, max: 14, message: "密码长度为6-14个字符", trigger: "blur" },
    { required: true, validator: equalToPassword, trigger: "blur" },
  ],
  phoneNumber: [
    { required: true, message: "手机号不得为空", trigger: "blur" },
    { required: true, validator: checkMobile, trigger: "blur" },
  ],
  qqNumber: [{ required: true, message: "QQ号不得为空", trigger: "blur" }],
  agree: [
    {
      validator: (rule, value, callback) => {
        if (value) {
          callback();
        } else {
          callback(new Error("请勾选协议"));
        }
      },
    },
  ],
};

const formRef = ref(null);
const router = useRouter();
const doRegister = () => {
  const { account, password, phoneNumber, qqNumber } = form.value;
  formRef.value.validate(async (valid) => {
    if (valid) {
      await registerAPI({
        account,
        password,
        phoneNumber,
        qqNumber,
        type: userType,
      });
      ElMessage({ type: "success", message: "注册成功" });
      router.replace({ path: "/login" });
    }
  });
};
</script>

<template>
  <div>
    <header class="login-header">
      <div class="container m-top-20">
        <h1 class="logo">
          <RouterLink to="/">福鱼</RouterLink>
        </h1>
        <RouterLink class="entry" to="/">
          进入网站首页
          <i class="iconfont icon-angle-right"></i>
          <i class="iconfont icon-angle-right"></i>
        </RouterLink>
      </div>
    </header>
    <section class="login-section">
      <div class="wrapper">
        <nav>
          <a href="javascript:;">账户注册</a>
        </nav>
        <div class="account-box">
          <div class="form">
            <el-form
              ref="formRef"
              :model="form"
              :rules="rules"
              label-position="left"
              label-width="80px"
              status-icon
            >
              <el-form-item prop="account" label="账户">
                <el-input v-model="form.account" />
              </el-form-item>
              <el-form-item prop="password" label="密码">
                <el-input
                  type="password"
                  show-password
                  v-model="form.password"
                /> </el-form-item
              ><el-form-item prop="confirm" label="确认密码">
                <el-input
                  type="password"
                  show-password
                  v-model="form.confirm"
                />
              </el-form-item>
              <el-form-item prop="phoneNumber" label="手机号">
                <el-input v-model="form.phoneNumber" />
              </el-form-item>
              <el-form-item prop="qqNumber" label="QQ">
                <el-input v-model="form.qqNumber" />
              </el-form-item>
              <el-form-item prop="agree" label-width="22px">
                <el-checkbox size="large" v-model="form.agree">
                  我已同意隐私条款和服务条款
                </el-checkbox>
              </el-form-item>
              <el-button size="large" class="subBtn" @click="doRegister"
                >点击注册</el-button
              >
              <div
                style="
                  margin-top: 10px;
                  width: 100%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                "
              >
                <RouterLink to="/login">去登录</RouterLink>
              </div>
            </el-form>
          </div>
        </div>
      </div>
    </section>

    <footer class="login-footer">
      <div class="container">
        <p>
          <a href="javascript:;">关于我们</a>
          <a href="javascript:;">帮助中心</a>
          <a href="javascript:;">友情链接</a>
        </p>
        <p>CopyRight &copy; 许影杰</p>
      </div>
    </footer>
  </div>
</template>

<style scoped lang="scss">
.login-header {
  background: #fff;
  border-bottom: 1px solid #e4e4e4;

  .container {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  .logo {
    width: 200px;

    a {
      display: block;
      height: 132px;
      width: 100%;
      text-indent: -9999px;
      background: url("@/assets/images/logo.png") no-repeat center 18px /
        contain;
    }
  }

  .sub {
    flex: 1;
    font-size: 24px;
    font-weight: normal;
    margin-bottom: 38px;
    margin-left: 20px;
    color: #666;
  }

  .entry {
    width: 120px;
    margin-bottom: 38px;
    font-size: 16px;

    i {
      font-size: 14px;
      color: $xtxColor;
      letter-spacing: -5px;
    }
  }
}

.login-section {
  background: url("@/assets/images/login-bg.png") no-repeat center / cover;
  height: 488px;
  position: relative;

  .wrapper {
    width: 380px;
    background: #fff;
    position: absolute;
    left: 50%;
    top: 10px;
    transform: translate3d(100px, 0, 0);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);

    nav {
      font-size: 14px;
      height: 55px;
      margin-bottom: 20px;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      padding: 0 40px;
      text-align: right;
      align-items: center;

      a {
        flex: 1;
        line-height: 1;
        display: inline-block;
        font-size: 18px;
        position: relative;
        text-align: center;
      }
    }
  }
}

.login-footer {
  padding: 30px 0 50px;
  background: #fff;

  p {
    text-align: center;
    color: #999;
    padding-top: 20px;

    a {
      line-height: 1;
      padding: 0 10px;
      color: #999;
      display: inline-block;

      ~ a {
        border-left: 1px solid #ccc;
      }
    }
  }
}

.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;

    a {
      color: $xtxColor;

      i {
        font-size: 14px;
      }
    }
  }

  .form {
    padding: 0 20px 20px 20px;
    a {
      padding: 0 15px;
      color: #cdcdcd;
      line-height: 1;
      display: inline-block;
      i {
        font-size: 14px;
        margin-right: 2px;
      }

      &:hover {
        color: $xtxColor;
      }
    }
    // &-item {
    //   margin-bottom: 28px;

    //   .input {
    //     position: relative;
    //     height: 36px;

    //     > i {
    //       width: 34px;
    //       height: 34px;
    //       background: #cfcdcd;
    //       color: #fff;
    //       position: absolute;
    //       left: 1px;
    //       top: 1px;
    //       text-align: center;
    //       line-height: 34px;
    //       font-size: 18px;
    //     }

    //     input {
    //       padding-left: 44px;
    //       border: 1px solid #cfcdcd;
    //       height: 36px;
    //       line-height: 36px;
    //       width: 100%;

    //       &.error {
    //         border-color: $priceColor;
    //       }

    //       &.active,
    //       &:focus {
    //         border-color: $xtxColor;
    //       }
    //     }

    //     .code {
    //       position: absolute;
    //       right: 1px;
    //       top: 1px;
    //       text-align: center;
    //       line-height: 34px;
    //       font-size: 14px;
    //       background: #f5f5f5;
    //       color: #666;
    //       width: 90px;
    //       height: 34px;
    //       cursor: pointer;
    //     }
    //   }

    //   > .error {
    //     position: absolute;
    //     font-size: 12px;
    //     line-height: 28px;
    //     color: $priceColor;

    //     i {
    //       font-size: 14px;
    //       margin-right: 2px;
    //     }
    //   }
    // }

    .agree {
      a {
        color: #069;
      }
    }

    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: $xtxColor;

      &.disabled {
        background: #cfcdcd;
      }
    }
  }

  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}

.subBtn {
  background: $xtxColor;
  width: 100%;
  color: #fff;
}
</style>
