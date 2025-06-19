import React, { useEffect, useState } from 'react'
import "./AdminManagerPostsLandlord.scss"
import CommonAdmin from '../../../layouts/AdminLayout/CommonAdmin/CommonAdmin'
import { Table } from 'antd'
import Column from 'antd/es/table/Column'
import BaseButton from '../../../components/BaseButton/BaseButton'
import BaseModal from '../../../components/BaseModal/BaseModal'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPostsByAllLandlord } from '../../../redux/reducers/posts'
import { deletePostsByCustomer } from '../../../redux/reducers/posts'
import { toast } from 'react-toastify'
import { adminApprovePost } from '../../../redux/reducers/posts'
import { adminRejectPost } from '../../../redux/reducers/posts'

export default function AdminManagerPostsLandlord() {
  const dispatch = useDispatch()
  const [statusFilter, setStatusFilter] = useState("pending");

  const { allPostsByAllLandlord } = useSelector((state) => state.postsReducer)
  console.log(">>>>>>", allPostsByAllLandlord)

  useEffect(() => {
    dispatch(getAllPostsByAllLandlord())
  }, [])

  const filteredPosts = allPostsByAllLandlord?.filter((post) =>
    statusFilter === "" ? true : post.status === statusFilter
  )

  const handleApprove = async (postId) => {
    try {
      const res = await dispatch(adminApprovePost(postId));
      if (res.payload.status === 200) {
        toast.success("Duyệt bài thành công");
        dispatch(getAllPostsByAllLandlord());
      } else {
        toast.error("Duyệt bài thất bại");
      }
    } catch (error) {
      toast.error("Đã có lỗi xảy ra");
    }
  }

  const handleReject = async (postId) => {
    try {
      const res = await dispatch(adminRejectPost(postId));
      if (res.payload.status === 200) {
        toast.success("Từ chối bài đăng thành công");
        dispatch(getAllPostsByAllLandlord());
      } else {
        toast.error("Từ chối bài đăng thất bại");
      }
    } catch (error) {
      toast.error("Đã có lỗi xảy ra");
    }
  }

  return (
    <CommonAdmin>
      <h3 className='ad_mana_post_cus_title'>Bài đăng của chủ nhà</h3>

      <div className='ad_mana_post_cus_action'>
        <div className='ad_mana_post_cus_action_select'>
          <span className='ad_mana_post_cus_action_select_title'>Chọn trạng thái bài đăng</span>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="pending">Đang chờ duyệt</option>
            <option value="approved">Đang hoạt động</option>
            <option value="reject">Bị từ chối</option>
          </select>
        </div>

        <Table style={{ textAlignLast: 'center' }}
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: false,
            pageSizeOptions: ['10', '20', '30'],
          }}
          dataSource={filteredPosts}
          bordered
        >
          <Column title={"STT"} render={(_, __, index) => <span>{index + 1}</span>} key="id" />
          <Column title={"Tên người đăng"}
            render={(item) => (
              <span>{item?.user_name}</span>
            )}
          />

          <Column title={"Tiêu đề bài đăng"}
            render={(item) => (
              <span>{item?.title}</span>
            )}
          />

          <Column title={"Thời gian đăng"}
            render={(item) => (
              <span>{item?.created_at}</span>
            )}
          />

          <Column title={"Trạng thái"}
            render={(item) => {
              if (item?.status === "pending") return <span>Đang chờ duyệt</span>;
              if (item?.status === "approved") return <span>Đang hoạt động</span>;
              if (item?.status === "reject") return <span>Đã từ chối</span>;
              return <span>Không xác định</span>;
            }}
          />

          <Column title={"Thao tác"} width={250}
            render={(item) => (
              <div className='flex'>
                <BaseButton type="blue" onClick="">Xem</BaseButton>

                {item.status === "pending" && (
                  <BaseButton type="green" onClick={() => handleApprove(item.id)}>Duyệt</BaseButton>
                )}

                {item.status === "pending" && (
                  <BaseButton type="red" onClick={() => handleReject(item.id)}>Từ chối</BaseButton>
                )}

                {item.status === "reject" && (
                  <BaseButton type="red" onClick="">Xóa</BaseButton>
                )}
              </div>
            )}
          />
        </Table>
      </div>
    </CommonAdmin>
  )
}
