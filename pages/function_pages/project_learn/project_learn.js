// pages/minecraft_pages/project_learn/project_learn.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    app: getApp(),
    resource_base_path: "https://cdn.modrinth.com/",
    has_project_data: false,
    has_follow: false,
    project_id: "",
    project_data: {},
    project_changelog_data: [],
    data_ready: false,
    project_data_article: {},
    project_view_type: 0,
    project_changelog_article: [],
    project_changelog_type: [],
    project_changelog_page_number: 1
  },
  changelog_page_back() {
    if (this.data.project_changelog_page_number > 1) {
      var num = this.data.project_changelog_page_number - 1;
      this.setData({
        'project_changelog_page_number': num
      });
      this.reload_project_version();
    }
  },
  changelog_page_next() {
    if (this.data.project_changelog_page_number <= this.data.project_data.versions.length) {
      var num = this.data.project_changelog_page_number + 1;
      this.setData({
        'project_changelog_page_number': num
      });
      this.reload_project_version();
    }
  },
  project_view_type_0(event) {
    getApp().globalData.RealtimeLog.info("pages/function_pages/project_learn/project_learn:项目信息块切换为0\n", event);
    this.setData({
      'project_view_type': 0
    })
  },
  project_view_type_1(event) {
    getApp().globalData.RealtimeLog.info("pages/function_pages/project_learn/project_learn:项目信息块切换为1\n", event);
    this.setData({
      'project_view_type': 1
    })
  },
  project_view_type_2(event) {
    getApp().globalData.RealtimeLog.info("pages/function_pages/project_learn/project_learn:项目信息块切换为2\n", event);
    this.setData({
      'project_view_type': 2
    })
  },
  get_project_version(id, page_number, callback) {
    wx.request({
      url: "https://api.modrinth.com/v2/project/" + id + "/version",
      dataType: "json",
      data: {
        include_changelog: true,
        limit: 10, // 只获取最近 10 个版本
        offset: (page_number - 1) * 10
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: (result) => {
        if (result.statusCode === 200) {
          callback(result.data);
          getApp().globalData.RealtimeLog.info("pages/function_pages/project_learn/project_learn:网络请求成功\n", result);
        } else {
          getApp().globalData.RealtimeLog.error("pages/function_pages/project_learn/project_learn:网络请求错误\n", result);
          wx.showToast({
            title: "网络请求错误:" + result.statusCode,
            icon: "none"
          });
          setTimeout(() => {
            wx.hideToast()
          }, 1000);
        }
      },
      fail: (err) => {
        wx.showToast({
          title: "网络请求失败:" + err.errno,
          icon: "none"
        });
        setTimeout(() => {
          wx.hideToast()
        }, 1000);
        getApp().globalData.RealtimeLog.error("pages/function_pages/project_learn/project_learn:网络请求失败\n", err);
      }
    });
  },
  get_project_info(id, callback) {
    wx.request({
      url: "https://api.modrinth.com/v2/project/" + id,
      dataType: "json",
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: (result) => {
        if (result.statusCode === 200) {
          callback(result.data);
          getApp().globalData.RealtimeLog.info("pages/function_pages/project_learn/project_learn:网络请求成功\n", result);
        } else {
          getApp().globalData.RealtimeLog.error("pages/function_pages/project_learn/project_learn:网络请求错误\n", result);
          wx.showToast({
            title: "网络请求错误:" + result.statusCode,
            icon: "none"
          });
          setTimeout(() => {
            wx.hideToast()
          }, 1000);
        }
      },
      fail: (err) => {
        wx.showToast({
          title: "网络请求失败:" + err.errno,
          icon: "none"
        });
        setTimeout(() => {
          wx.hideToast()
        }, 1000);
        getApp().globalData.RealtimeLog.error("pages/function_pages/project_learn/project_learn:网络请求失败\n", err);
      }
    });
  },
  navigate_back(event) {
    getApp().globalData.RealtimeLog.info("pages/function_pages/project_learn/project_learn:返回被点击\n", event);
    wx.navigateBack();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      app: getApp(),
      project_id: options.project_id
    });
    this.get_project_info(this.data.project_id, (res) => {
      this.setData({
        'project_data': res,
        'has_project_data': true
      });
      this.setData({
        'project_data_article': getApp().towxml(this.data.project_data.body, 'markdown', {
          base: this.data.resource_base_path, // 相对资源的base路径
          theme: 'dark', // 主题，默认`light`
          events: { // 为元素绑定的事件方法
            tap: (e) => {
              console.info('pages/function_pages/project_learn/project_learn:towxml>>\n', e);
            }
          }
        }),
        'data_ready': true
      });
    });
    this.reload_project_version();
    var follow_projects = wx.getStorageSync("save_projects");
    if (!Array.isArray(follow_projects)) {
      follow_projects = [];
    }
    this.setData({
      has_follow: follow_projects.includes(this.data.project_id)
    });
    getApp().globalData.RealtimeLog.info("pages/function_pages/project_learn/project_learn:页面加载\n", options);
  },
  reload_project_version() {
    this.get_project_version(this.data.project_id, this.data.project_changelog_page_number, (res) => {
      this.setData({
        'project_changelog_data': res
      });
      if (res.length != 0) {
        var changelog_article = [];
        var changelog_type = [];
        for (var num = 0; num < res.length; ++num) {
          changelog_article.push(getApp().towxml(res[num].changelog, 'markdown', {
            base: this.data.resource_base_path, // 相对资源的base路径
            theme: 'dark', // 主题，默认`light`
          }));
          changelog_type.push(res[num].version_type.charAt(0).toUpperCase());
        };
        this.setData({
          'project_changelog_article': changelog_article,
          'project_changelog_type': changelog_type
        });
      };
    });
  },
  project_download_main(event) {
    if (this.data.project_view_type === 2) {
      wx.showToast({
        title: "已在下载页",
        icon: "none"
      });
      setTimeout(() => {
        wx.hideToast();
      }, 1000);
    };
    this.setData({
      'project_view_type': 2
    });
  },
  project_download(event) {
    getApp().globalData.RealtimeLog.info("pages/function_pages/project_learn/project_learn:下载按钮点击\n", event);
    var version_index = event.target.dataset.index;
    wx.showActionSheet({
      itemList: ["复制下载链接", "收藏文件"],
      success: (res) => {
        getApp().globalData.RealtimeLog.info("pages/function_pages/project_learn/project_learn:用户选择下载方式\n", res);
        const tap_index = res.tapIndex;
        if (tap_index === 0) {
          wx.setClipboardData({
            data: this.data.project_changelog_data[version_index].files[0].url,
            success: (res) => {
              wx.showToast({
                title: "已复制",
                icon: "none"
              });
              setTimeout(() => {
                wx.hideToast();
              }, 1000)
              getApp().globalData.RealtimeLog.info("pages/function_pages/project_learn/project_learn:写入下载链接剪切板成功\n", res);
            }
          });
        } else if (tap_index === 1) {
          wx.showToast({
            title: "下载中",
            icon: "none"
          });
          setTimeout(() => {
            wx.hideToast();
          }, 1000)

          wx.downloadFile({
            url: this.data.project_changelog_data[version_index].files[0].url,
            enableHttp2: true,
            enableQuic: true,
            success: (res) => {
              if (res.statusCode === 200) {
                wx.addFileToFavorites({
                  filePath: res.tempFilePath,
                  fileName: this.data.project_changelog_data[version_index].files[0].filename,
                  success: (res) => {
                    wx.showToast({
                      title: '文件收藏成功',
                      icon: "success"
                    });
                    setTimeout(() => {
                      wx.hideToast();
                    }, 1000)
                  },
                  fail: (err) => {
                    getApp().globalData.RealtimeLog.error("pages/function_pages/project_learn/project_learn:下载文件收藏失败\n", err);
                    wx.showToast({
                      title: '文件收藏失败',
                      icon: "none"
                    });
                    setTimeout(() => {
                      wx.hideToast();
                    }, 1000)
                  }
                });
              } else {
                getApp().globalData.RealtimeLog.error("pages/function_pages/project_learn/project_learn:下载文件错误\n", err);
                wx.showToast({
                  title: '文件下载错误:' + res.statusCode,
                  icon: "none"
                });
                setTimeout(() => {
                  wx.hideToast();
                }, 1000)
              };
            },
            fail: (err) => {
              getApp().globalData.RealtimeLog.error("pages/function_pages/project_learn/project_learn:下载文件失败\n", err);
              wx.showToast({
                title: '文件下载失败:' + res.errno,
                icon: "none"
              });
              setTimeout(() => {
                wx.hideToast();
              }, 1000)
            }
          })
        };
      }
    });
  },
  version_name_click(event) {
    this.setData({
      'project_view_type': 2
    });
    wx.pageScrollTo({
      selector: "#version_" + event.target.dataset.index
    });
  },
  changelog_name_click(event) {
    this.setData({
      'project_view_type': 1
    });
    wx.pageScrollTo({
      selector: "#changelog_" + event.target.dataset.index
    });
  },
  more_icon(event) {
    wx.showActionSheet({
      itemList: ["复制项目ID", "复制项目链接"],
      success: (res) => {
        getApp().globalData.RealtimeLog.info("pages/function_pages/project_learn/project_learn:更多按钮选项选择\n", event, res);
        if (res.tapIndex === 0) {
          wx.setClipboardData({
            data: this.data.project_data.id,
            success: (res) => {
              wx.showToast({
                title: "已复制项目ID"
              });
              setTimeout(() => {
                wx.hideToast();
              }, 1000)
            }
          });
        } else if (res.tapIndex === 1) {
          wx.setClipboardData({
            data: "https://modrinth.com/project/" + this.data.project_data.id,
            success: (res) => {
              wx.showToast({
                title: "已复制项目链接"
              });
              setTimeout(() => {
                wx.hideToast();
              }, 1000);
            }
          });
        };
      }
    });
  },
  follow_click(event) {
    const newFollowState = !this.data.has_follow;
    this.setData({
      "has_follow": newFollowState
    });

    let follow_projects = wx.getStorageSync("save_projects");
    if (!Array.isArray(follow_projects)) {
      follow_projects = [];
    }

    const projectId = this.data.project_id;

    if (newFollowState) {
      if (!follow_projects.includes(projectId)) {
        follow_projects.push(projectId);
        wx.setStorageSync("save_projects", follow_projects);
        wx.showToast({
          title: "收藏成功",
          icon: "none"
        });
        setTimeout(() => {
          wx.hideToast();
        }, 1000);
        getApp().globalData.RealtimeLog.info("pages/function_pages/project_learn/project_learn:项目关注成功\n", projectId);
      }
    } else {
      const index = follow_projects.indexOf(projectId);
      if (index !== -1) {
        follow_projects.splice(index, 1);
        wx.setStorageSync("save_projects", follow_projects);
        wx.showToast({
          title: "取消收藏",
          icon: "none"
        });
        setTimeout(() => {
          wx.hideToast();
        }, 1000);
        getApp().globalData.RealtimeLog.info("pages/function_pages/project_learn/project_learn:项目取消关注\n", projectId);
      }
    }
  },
  project_image_click(event) {
    wx.previewMedia({
      sources: [{
        url: this.data.project_data.icon_url
      }],
      showmenu: true
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.setData({
      app: getApp()
    })
    getApp().globalData.RealtimeLog.info("pages/function_pages/project_learn/project_learn:初次渲染完成\n");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.setData({
      app: getApp()
    })
    getApp().globalData.RealtimeLog.info("pages/function_pages/project_learn/project_learn:页面显示\n");
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})