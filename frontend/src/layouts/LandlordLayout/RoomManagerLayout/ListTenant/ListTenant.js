import React, { useEffect, useState } from 'react'
import './ListTenant.scss'
import { useDispatch } from 'react-redux'
import Img from '../../../../assets/Images/User/avatar_tenant.png'
import BaseButton from '../../../../components/BaseButton/BaseButton'
import BaseModal from '../../../../components/BaseModal/BaseModal'
import dayjs from 'dayjs'
import AddTenant from '../../../../pages/Landlord/TenantManager/AddTenant/AddTenant'
import { deleteTenant } from '../../../../redux/reducers/tenant'
import { getTenantByRoom } from '../../../../redux/reducers/tenant'

export default function ListTenant({ tenants, roomId }) {
  const dispatch = useDispatch()
  const [showAddTenantModal, setShowAddTenantModal] = useState(false);
  const [isShowDeleteTenant, setIsShowDeleteTenant] = useState(false)
  const [selectedTenantId, setSelectedTenantId] = useState(null);

  const handleAddListTenantModal = () => {
    setShowAddTenantModal(true);
  };

  const handleShowDeleteTenant = (tenantId) => {
    setSelectedTenantId(tenantId);
    setIsShowDeleteTenant(true)
  }

  function handleClose() {
    setIsShowDeleteTenant(false)
  }

  const handleDeleteTenant = async () => {
    if (selectedTenantId) {
      await dispatch(deleteTenant(selectedTenantId));
      setIsShowDeleteTenant(false);
      setSelectedTenantId(null);
      dispatch(getTenantByRoom(roomId));
    }
  };

  return (
    <div>
      <BaseButton type="blue" onClick={() => handleAddListTenantModal()}>Thêm khách thuê</BaseButton>

      <div className='list_tenant_info'>
        {tenants?.map((tenant) => {
          return (
            <div className='list_tenant_info_item'>
              <span className='list_tenant_info_item_name'>{tenant?.name}</span>

              <div className='list_tenant_info_item_flex'>
                <div className='list_tenant_info_item_flex_image'><img src={Img} /></div>
                <div className='list_tenant_info_item_flex_content'>
                  <span>SĐT: {tenant?.phone}</span>
                  <span>CMND: {tenant?.identity_number}</span>
                  <span>Ngày vào: {dayjs(tenant?.created_at).format('DD/MM/YYYY')}</span>
                  <span>Ghi chú: {tenant?.note}</span>

                  <div className='list_tenant_info_item_flex_content_button'>
                    <BaseButton type="warning">Cập nhật</BaseButton>
                    <BaseButton type="red" onClick={() => handleShowDeleteTenant(tenant.id)}>Xóa khách thuê</BaseButton>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <>
        <BaseModal
          open={isShowDeleteTenant}
          title="Xóa khách thuê"
          type="red"
          content="Bạn có chắc chắn muốn xóa khách thuê không ?"
          onCancel={handleClose}
          onConfirm={handleDeleteTenant}
        />
      </>

      <BaseModal
        open={showAddTenantModal}
        type="blue"
        width="35%"
        title="Thêm khách thuê"
        content={<AddTenant roomId={roomId} />}
        onCancel={() => setShowAddTenantModal(false)}
        onConfirm=""
      />
    </div>
  )
}
