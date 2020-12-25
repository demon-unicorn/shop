import Vue from 'vue'
const app= new Vue()

export const successAlert=(mes)=>{
    app.$message({
        message: mes,
        type: 'success'
      });
}


export const warnAlert=(mes)=>{
    app.$message({
        message: mes,
        type: 'warning'
      });
}

export const errorAlert=(mes)=>{
    app.$message.error(mes);
}