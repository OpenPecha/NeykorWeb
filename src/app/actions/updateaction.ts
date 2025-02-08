import axios from "axios"

export async function updateUser(email: string, userData:any) {
    try {
      const response = await axios.put(
        `https://gompa-tour-api.onrender.com/user/${email}`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      return { success: true, data: response.data }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("API Error:", error.response?.data || error.message)
        throw new Error(`Failed to update user: ${error.message}`)
      }
      throw error
    }
  }

  export async function updatestatue(statueid: string, data:any) {
    try {
      const response = await axios.put(
        `https://gompa-tour-api.onrender.com/statue/${statueid}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      return { success: true, data: response.data }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("API Error:", error.response?.data || error.message)
        throw new Error(`Failed to update user: ${error.message}`)
      }
      throw error
    }
  }

  export async function updateFestival(fesid: string, data:any) {
    try {
      const response = await axios.put(
        `https://gompa-tour-api.onrender.com/festival/${fesid}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      return { success: true, data: response.data }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("API Error:", error.response?.data || error.message)
        throw new Error(`Failed to update user: ${error.message}`)
      }
      throw error
    }
  }

  export async function updategonpa(monsid: string, data:any) {
    try {
      const response = await axios.put(
        `https://gompa-tour-api.onrender.com/gonpa/${monsid}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      return { success: true, data: response.data }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("API Error:", error.response?.data || error.message)
        throw new Error(`Failed to update user: ${error.message}`)
      }
      throw error
    }
  }

  export async function updatesite(siteid: string, data:any) {
    try {
      const response = await axios.put(
        `https://gompa-tour-api.onrender.com/pilgrim/${siteid}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      return { success: true, data: response.data }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("API Error:", error.response?.data || error.message)
        throw new Error(`Failed to update user: ${error.message}`)
      }
      throw error
    }
  }

  export async function updatecontact(contactid: string, data:any) {
    try {
      const response = await axios.put(
        `https://gompa-tour-api.onrender.com/contact/${contactid}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      return { success: true, data: response.data }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("API Error:", error.response?.data || error.message)
        throw new Error(`Failed to update user: ${error.message}`)
      }
      throw error
    }
  }