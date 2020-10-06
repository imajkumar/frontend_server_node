import React from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Input, Form,Button } from 'antd'


const profileEdit = ({dispatch}) =>
{

  const onFinish = values =>
  {
    dispatch( {
      type: 'update/PROFILE',
      payload: values,
    } )
  }
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
    },
  }

  const onFinishFailed = errorInfo =>
  {
    console.log( 'Failed:', errorInfo )
  }


  return (
    <div>
      <Helmet title="My profile" />
      <div className="card">
        <div className="card-body">
          <h5 className="mb-4">
            <strong>Details</strong>
          </h5>
          <Form
            {...formItemLayout}
            labelAlign="left"
            layout="vertical"
            hideRequiredMark
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            className="mb-4"
          >
            <Form.Item name="usrName" label="Name">
              <Input placeholder="Your Fullname..." />
            </Form.Item>
            <Form.Item name="usrEmail" label="Email">
              <Input placeholder="Your Email..." />
            </Form.Item>
            <Form.Item name="usrPhone" label="Phone:">
              <Input placeholder="Your Phone..." />
            </Form.Item>

            <Button
              type="primary"
              size="large"
              className="text-center w-100"
              htmlType="submit"             
            >
              <strong>Sign in</strong>
            </Button>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default connect()(profileEdit)