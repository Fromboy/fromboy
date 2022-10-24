#!name=SpotifyTest
#!desc=部分解锁premium,建议重新登录,音质不能设置为超高
# 1. 搜索界面 歌单/歌曲可以随意切换完全播放  2. 音乐库已点赞歌曲随意切换完全播放

http:
  mitm:
    - '%APPEND% spclient.wg.spotify.com'
  script:
    - match: ^https:\/\/spclient\.wg\.spotify\.com\/(bootstrap\/v1\/bootstrap|user-customization-service\/v1\/customize)$
      name: SpotifyTest
      type: response
      require-body: 1
      timeout: 10
script-providers:
  SpotifyTest:
    url: https://raw.githubusercontent.com/app2smile/rules/master/js/spotify-proto-test.js