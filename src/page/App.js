import './style.less'
import {Button, Card, Divider, Form, Input, PageHeader, Select, Tooltip} from "antd";
import {Content} from "antd/es/layout/layout";
import {useForm} from "antd/es/form/Form";
import {useState} from "react";
import {QuestionCircleOutlined} from "@ant-design/icons";

function App() {
    const [form] = Form.useForm();
    const [dayMoney, setDayMoney] = useState(0);
    const [daySf, setDaySf] = useState(0);
    const [jyF, setJyF] = useState(0);
    const [updateF, setUpdateF] = useState(0);
    const [runF, setRunF] = useState(0);
    const [dayCmoney, setDayCmoney] = useState(0);
    const [initValues, setInitValues] = useState({
        bussinessIndex: undefined,
        bussinessType: 1,
        sales: undefined,
        counter: 10,
        basic: 1800,
        time: 24
    });

    const onFinish = (value) => {
        let sy = 0;
        const {bussinessType, bussinessIndex, sales, counter, basic, time} = value;
        if (bussinessType === 1) {
            if (sales >= 500) {
                const sl = (sales - 100) / 20000 * (bussinessIndex / 100)
                sy = sales * (sl > 0.1 ? 0.1 : sl);
            }
        } else {
            if (sales >= 1500) {
                const sl = (sales - 1000) / 50000 * (bussinessIndex / 100);
                sy = sales * (sl > 0.1 ? 0.1 : sl)
            }
        }
        setJyF(changeCount(sy))
        setUpdateF(5 * (bussinessIndex / 100) * counter)
        setRunF(changeCount(((basic / 10000) * (bussinessIndex / 100) * counter * time)))
        setDayMoney(sales)

    }

    const reset = () => {
        form.resetFields();
    }

    const changeCount = (num) => {
        return Math.floor(num * 100) / 100
    }

    return (
        <div className="App">
            <PageHeader
                className="site-page-header"
                backIcon={false}
                title="梦幻西游商会计算器"
                subTitle="用来计算商会现金模式每天大概需要交多少税"
            >
                <div className="panel-content">
                    <Form form={form} initialValues={initValues} style={{marginBottom: 20}} onFinish={onFinish}>
                        <Form.Item label={'区里商业指数'} name={'bussinessIndex'}
                                   rules={[{required: true, message: '老区一般170%,新区100%'}]}>
                            <Input placeholder='老区一般170' suffix="%" type={'number'}/>
                        </Form.Item>
                        <Form.Item label={'商店类型'} name={'bussinessType'}>
                            <Select style={{width: '100%'}}>
                                <Select.Option value={1}>宠物类型</Select.Option>
                                <Select.Option value={2}>物品类型</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label={'今日销售额'}
                                   name={'sales'}
                                   rules={[{required: true, message: '当前选项不能为空，销售额决定了交易税'}]}>
                            <Input type={'number'} placeholder='' suffix="W"/>
                        </Form.Item>
                        <Form.Item label={'柜台数量'} name={'counter'}>
                            <Input placeholder='' type={'number'} suffix="间"/>
                        </Form.Item>
                        <Form.Item label={'基础费用'} name={'basic'}>
                            <Input placeholder='默认1800' type={'number'} suffix="两"/>
                        </Form.Item>
                        <Form.Item label={'运营小时'} name={'time'}>
                            <Input placeholder='' disabled suffix="小时"/>
                        </Form.Item>
                        <div className="btn-group">
                            <Button type={'primary'} htmlType="submit">计算费用</Button>
                            <Button onClick={reset}>重置</Button>
                        </div>
                    </Form>
                    <Card bordered>
                        基础维护费：基础维护费是5万x100%（商业指数)x柜台数量<br/>
                        <Divider dashed/>
                        基础营业费：2000x100%（商业指数）x柜台数量x运营小时<br/>
                        <Divider dashed/>
                        交易税会根据销售额来计算相对应的交易税:<br/>
                        召唤兽店：<br/>
                        若营业额≥500万梦幻币，则税率为：((营业额-100万)÷20000万)×100%。(精确到0.01%，最高不超过10%)<br/>
                        物品店：<br/>
                        若营业额≥1500万梦幻币，则税率为：((营业额-1000万)÷50000万)×100%。(精确到0.01%，最高不超过4%)<br/>

                    </Card>
                </div>
                <Card bordered style={{marginTop: 10}} className={'count-panel'}>
                    今日销售额：<span>{dayMoney}</span>W<br/>
                    今日扣税费：<span>{updateF + runF + jyF}</span>W 其中基础维护费：<span>{updateF}</span>W
                    基础营业费：<span>{runF}</span>W 交易税：<span>{jyF}</span>W<br/>
                    今日净利润：<span>{dayMoney - updateF - runF - jyF}</span>W<br/>
                </Card>
            </PageHeader>
        </div>
    );
}

export default App;
