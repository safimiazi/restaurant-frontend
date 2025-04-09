import { Result, Button, Card, Row, Col } from 'antd';
import { SmileOutlined, CheckCircleFilled } from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
  const { tran_id } = useParams();
  const navigate = useNavigate();

  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
      <Card bordered={false}>
        <Result
          icon={<CheckCircleFilled style={{ color: '#52c41a', fontSize: '72px' }} />}
          status="success"
          title="Payment Successful!"
          subTitle={`Your transaction ID: ${tran_id}`}
          extra={[
            <Button 
              type="primary" 
              key="console"
              onClick={() => navigate('/orders')}
            >
              View Your Orders
            </Button>,
            <Button 
              key="buy"
              onClick={() => navigate('/')}
            >
              Continue Shopping
            </Button>,
          ]}
        />

        <Row gutter={16} style={{ marginTop: '40px' }}>
          <Col span={12}>
            <Card title="What's Next?" bordered={false}>
              <p><SmileOutlined /> Your order is being processed</p>
              <p><SmileOutlined /> You'll receive a confirmation email shortly</p>
              <p><SmileOutlined /> Delivery within 3-5 business days</p>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Need Help?" bordered={false}>
              <p>Contact our customer support:</p>
              <p>📞 +880 1234 567890</p>
              <p>✉️ support@yourstore.com</p>
              <Button type="link" onClick={() => navigate('/contact')}>
                Contact Us
              </Button>
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default PaymentSuccess;