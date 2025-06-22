import React, { useEffect, useState } from 'react'
import './ListTenant.scss'
import Img from '../../../../assets/Images/User/avatar_tenant.png'
import BaseButton from '../../../../components/BaseButton/BaseButton'
import dayjs from 'dayjs'

export default function ListTenant({ tenants }) {

  const [showAddTenantModal, setShowAddTenantModal] = useState(false);

  return (
    <div>
      <BaseButton type="blue">Thêm khách thuê</BaseButton>

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
                    <BaseButton type="red">Xóa khách thuê</BaseButton>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
