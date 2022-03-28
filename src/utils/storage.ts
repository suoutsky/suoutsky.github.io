
function isExpired (expires: any) {
  const expirationDate: any = new Date(expires)
  const now: any = new Date()
  return now - expirationDate >= 0
}

function getKey (key: string) {
  return `${key}`
}

class Storage {
  static getItem (key: string) {
    return new Promise((success, fail) => {
      try {
        success(localStorage.getItem(getKey(key)))
      } catch (error) {
        fail(error)
      }
    })
      .then((res: any) => {
        if (res) {
          const resJson = JSON.parse(res)
          if (resJson.expires && isExpired(resJson.expires)) {
            this.removeItem(key)
            return null
          }
          return resJson
        }
        return null
      })
      .catch(() => null)
  }

  static setItem (key: string, userInfo: any, expirationDate?: any) {
    if (userInfo !== undefined) {
      const data: any = {
        expires: expirationDate && expirationDate.toGMTString(),
        ...userInfo,
      }
      return new Promise((success, fail) => {
        try {
          success(localStorage.setItem(getKey(key), JSON.stringify(data)))
        } catch (error) {
          fail(error)
        }
      })
    }
    return Promise.reject()
  }

  static clear () {
    return new Promise((success, fail) => {
      try {
        success(localStorage.clear())
      } catch (error) {
        fail(error)
      }
    })
  }

  static removeItem (key: string) {
    return new Promise((success, fail) => {
      try {
        success(localStorage.removeItem(getKey(key)))
      } catch (error) {
        fail(error)
      }
    })
  }
}

export default Storage
