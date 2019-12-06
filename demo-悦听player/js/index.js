let app  = new Vue({
    el:'#player',
    data:{
        query:'',
        musicList:[],
        musicUrl:'',
        musicImg:'',
        pinglun:[],
        isPlaying:false,
        mvUrl:'',
        isShow:false,
    },
    methods: {
        serarchMusic:function(){
           let that = this;
            axios.get('https://autumnfish.cn/search?keywords='+this.query)
            .then(function(res){
                //console.log(res);
                that.musicList= res.data.result.songs;
            },function(err){
                console.log(err);
            })
        },
        playMusic:function(musicId){
            let that = this;
            axios.get('https://autumnfish.cn/song/url?id='+musicId).then(function(res){
              that.musicUrl=  res.data.data[0].url
              console.log(1)
            },function(err){
                console.log(err)
            })
            axios.get('https://autumnfish.cn/song/detail?ids='+musicId).then(function(res){
                //console.log(res);
                that.musicImg = res.data.songs[0].al.picUrl;
            },function(err){
                console.log(err);
            })
            //歌曲评论
            axios.get('https://autumnfish.cn/comment/hot?type=0&id='+musicId).then(
                function(res){
                    console.log(res)
                    //评论
                    that.pinglun=res.data.hotComments;
                },function(err){
                    console.log(err)
                }
            )
        },
        play:function(){
            this.isPlaying=true;
        },
        pause:function(){
            this.isPlaying=false;
        },
        playMv:function(mvid){
            let that = this;
            axios.get('https://autumnfish.cn/mv/url?id='+mvid)
            .then(function(res){
                console.log(res)
                that.isShow=true;
                that.mvUrl=res.data.data.url;
            },function(err){
                console.log(err)
            })
        },
        zz:function(){
            this.isShow=false;
            this.mvUrl='';
        }
    },
})