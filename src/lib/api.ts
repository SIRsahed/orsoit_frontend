/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { getSession } from "next-auth/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
});

// Add request interceptor to add auth token
api.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    if (session?.user?.accessToken) {
      config.headers.Authorization = `Bearer ${session.user.accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Auth API
export async function loginUser(credentials: {
  email: string;
  password: string;
}) {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Login failed",
    };
  }
}

export async function updateProfile(data: any) {
  try {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (data[key] !== undefined && data[key] !== null) {
        if (key === "abator" && typeof data[key] === "object") {
          formData.append(key, data[key]);
        } else {
          formData.append(key, data[key].toString());
        }
      }
    });

    const response = await api.put("/auth/profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to update profile",
    );
  }
}

// User API
export async function fetchUsers(page = 1, limit = 10) {
  try {
    const response = await api.get(`/users?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch users");
  }
}


export async function changePassword(data: any) {
  try {
    const response = await api.post("/auth/change-password", data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to change password");
  }
}


export async function fetchSingleUser(userId: string) {
  try {
    const response = await api.get(`/single/user/${userId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch user");
  }
}


export async function fetchAdminUsers() {
  try {
    const response = await api.get("/admin-users");
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch admin users",
    );
  }
}

export async function deleteUser(userId: string) {
  try {
    const response = await api.delete(`/users/${userId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to delete user");
  }
}

// Revenue API
export async function fetchRevenue(type: string) {
  try {
    const response = await api.get(`/revenue?type=${type}`);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch revenue data",
    );
  }
}

// Services API
export async function fetchServices() {
  try {
    const response = await api.get("/default-services");
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch services",
    );
  }
}

export async function fetchService(id: string) {
  try {
    const response = await api.get(`/default-services/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch service");
  }
}

export async function createService(data: any) {
  try {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    if (data.image) {
      formData.append("image", data.image);
    }

    const response = await api.post("/default-services", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to create service",
    );
  }
}

export async function updateService(id: string, data: any) {
  try {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    if (data.image) {
      formData.append("image", data.image);
    }

    const response = await api.put(`/default-services/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to update service",
    );
  }
}

export async function deleteService(id: string) {
  try {
    const response = await api.delete(`/default-services/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to delete service",
    );
  }
}

// Subscription Plans API
export async function fetchSubscriptionPlans({
  serviceId,
}: {
  serviceId: string;
}) {
  try {
    const response = await api.get(`/services-plans/one/${serviceId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "No subscription plan found",
    );
  }
}

export async function fetchSubscriptionPlan(id: string) {
  try {
    const response = await api.get(`/subscription-plans/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch subscription plan",
    );
  }
}

export async function createSubscriptionPlan(data: any) {
  try {
    const response = await api.post("/subscription-plans", data);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to create subscription plan",
    );
  }
}

export async function updateSubscriptionPlan(id: string, data: any) {
  try {
    const response = await api.put(`/subscription-plans/${id}`, data);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to update subscription plan",
    );
  }
}

export async function deleteSubscriptionPlan(id: string) {
  try {
    const response = await api.delete(`/subscription-plans/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to delete subscription plan",
    );
  }
}


export async function fetchUserSubscriptions(userId: string) {
  try {
    const response = await api.get(`user/subscription-plan/${userId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch user subscriptions",
    );
  }
}

// Payment API
export async function fetchPayments(page = 1, limit = 10) {
  try {
    const response = await api.get(`/payments?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch payments",
    );
  }
}

// Tickets API
export async function fetchTickets(page = 1, limit = 10) {
  try {
    const response = await api.get(`/tickets?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch tickets");
  }
}

export async function fetchTicket(id: string) {
  try {
    const response = await api.get(`/tickets/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch ticket");
  }
}


export async function fetchUserTickets(userId: string) {
  try {
    const response = await api.get(`/tickets/user/${userId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch user tickets");
  }
}


export async function createTicket(data: any) {
  try {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (data[key] !== undefined && data[key] !== null) {
        if (key === "attachments" && Array.isArray(data[key])) {
          data[key].forEach((file: File, index: number) => {
            formData.append(`attachments[${index}]`, file);
          });
        } else {
          formData.append(key, data[key].toString());
        }
      }
    });

    const response = await api.post("/tickets", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to create ticket");
  }
}

export async function assignTicket(ticketId: string, adminId: string) {
  try {
    const response = await api.put(`/tickets/${ticketId}/assign`, { adminId });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to assign ticket");
  }
}

// Rooms API
export async function fetchRooms() {
  try {
    const response = await api.get("/rooms");
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch rooms");
  }
}



// Fetch user rooms
export async function fetchUserRooms(userId: string) {
  try {
    const response = await api.get(`/rooms/user?userId=${userId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch user rooms");
  }
}


export async function createRoom(data: {
  userId: string;
  adminId: string;
  ticketId: string;
}) {
  try {
    const response = await api.post("/create-room", data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to create room");
  }
}

export async function closeRoom(roomId: string) {
  try {
    const response = await api.put("/close-room", { roomId });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to close room");
  }
}

// Messages API
export async function fetchMessages(roomId: string) {
  try {
    const response = await api.get(`/receive-message?roomId=${roomId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch messages",
    );
  }
}

export async function sendMessage(data: {
  userId: string;
  roomId: string;
  message: string;
  attachmentFile?: File;
}) {
  try {
    const formData = new FormData();
    formData.append("userId", data.userId);
    formData.append("roomId", data.roomId);
    formData.append("message", data.message);
    if (data.attachmentFile) {
      formData.append("attachmentFile", data.attachmentFile);
    }

    const response = await api.post("/send-message", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to send message");
  }
}

export async function fetchCustomServices() {
  try {
    const response = await api.get("/custom-services");
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch custom services",
    );
  }
}

export async function createCustomService(data: FormData) {
  try {
    const response = await api.post("/custom-services", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to create custom service",
    );
  }
}

export async function approveCustomService(id: string, status: boolean) {
  try {
    const response = await api.put("/custom-service", {
      id,
      status: status.toString(),
    });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to update custom service status",
    );
  }
}

export async function deleteCustomService(id: string) {
  try {
    const response = await api.delete(`/custom-service/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to delete custom service",
    );
  }
}

export async function fetchUserById(userId: string) {
  try {
    const response = await api.get(`/single/user/${userId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch user");
  }
}

// Coupons API
export async function fetchCoupons() {
  try {
    const response = await api.get("/coupons");
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch coupons");
  }
}

export async function fetchCouponById(id: string) {
  try {
    const response = await api.get(`/coupons/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch coupon");
  }
}

export async function createCoupon(data: {
  userID: string;
  title: string;
  discount: number;
  code: string;
  applicableServices: string[];
  activeFrom: string;
  expireIn: string;
}) {
  try {
    const response = await api.post("/coupons", data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to create coupon");
  }
}

export async function updateCoupon(
  id: string,
  data: Partial<{
    title: string;
    discount: number;
    code: string;
    applicableServices: string[];
    activeFrom: string;
    expireIn: string;
  }>,
) {
  try {
    const response = await api.put(`/coupons/${id}`, data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to update coupon");
  }
}

export async function deleteCoupon(id: string) {
  try {
    const response = await api.delete(`/coupons/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to delete coupon");
  }
}



// Notification API
export async function fetchNotification(userId: string) {
  try {
    const response = await api.get(`/notifications/${userId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch notification");
  }
}



export async function deleteNotification(id: string) {
  try {
    const response = await api.delete(`/notifications/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to delete notification");
  }
}