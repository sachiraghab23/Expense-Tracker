import React, { useEffect, useState } from "react";
import { Form, Input, Modal, Select, message, Table, DatePicker } from "antd";
import {
  UnorderedListOutlined,
  AreaChartOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Layout from "./../components/Layout/Layout";
import Spinner from "./../components/Spinner";
import API from './../services/API';
import moment from "moment";
import categories from "../data/category";
import Analytics from "../components/Analytics";
const { RangePicker } = DatePicker;

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransactions, setAllTransactions] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [selectedDate, setSelectedDate] = useState([]);
  const [type, setType] = useState("all");
  const [viewData, setViewData] = useState("table");
  const [editable, setEditable] = useState(null);

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Reference",
      dataIndex: "reference",
    },
    {
      title: "Actions",
      render: (text, record) => (
        <div>
          <EditOutlined
            onClick={() => {
              setEditable(record);
              setShowModal(true);
            }}
          />
          <DeleteOutlined
            className="mx-2"
            onClick={() => handleDelete(record)}
          />
        </div>
      ),
    },
  ];

  useEffect(() => {
    const getAllTransactions = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        setLoading(true);
        const res = await API.post("./transactions/get-transactions", {
          userid: user._id,
          frequency,
          selectedDate,
          type,
        });
        setLoading(false);
        setAllTransactions(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
        message.error("Transactions fetching issue occured");
      }
    };
    getAllTransactions();
  }, [frequency, selectedDate, type]);

  //form handling

  const handleDelete = async (record) => {
    try {
      setLoading(true);
      await API.post("/transactions/delete-transaction", {
        transactionId: record._id,
      });
      setLoading(false);
      message.success("Transaction deleted successfully");
    } catch (error) {
      setLoading(false);
      console.log(error);
      message.error("Unable to delete");
    }
  };
  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      if (editable) {
        await API.post("/transactions/edit-transaction", {
          payload: { ...values, userid: user._id },
          transactionId: editable._id,
        });
        setLoading(false);
        message.success("Transaction updated successfully");
      } else {
        await API.post("/transactions/add-transaction", {
          ...values,
          userid: user._id,
        });
        setLoading(false);
        message.success("Transaction added successfully");
      }
      setShowModal(false);
      setEditable(null);
    } catch (error) {
      setLoading(false);
      message.error("Failed to add transaction");
    }
  };

  return (
    <>
      <Layout>
        {loading && <Spinner />}
        <div className="filters">
          <div>
            <h6>Select Frequency</h6>
            <Select
              value={frequency}
              onChange={(values) => setFrequency(values)}
            >
              <Select.Option value="7">Last 1 Week</Select.Option>
              <Select.Option value="30">Last 1 Month</Select.Option>
              <Select.Option value="365">Last 1 Year</Select.Option>
              <Select.Option value="custom">custom</Select.Option>
            </Select>
            {frequency === "custom" && (
              <RangePicker
                value={selectedDate}
                onChange={(values) => setSelectedDate(values)}
              />
            )}
          </div>
          <div>
            <h6>Select Type</h6>
            <Select value={type} onChange={(values) => setType(values)}>
              <Select.Option value="all">ALL</Select.Option>
              <Select.Option value="income">INCOME</Select.Option>
              <Select.Option value="expense">EXPENSE</Select.Option>
            </Select>
            {frequency === 'custom' && (
              <RangePicker value={selectedDate} onChange={(values)=> setSelectedDate(values)} />
            )}
          </div>
          <div className="switch-container">
            <UnorderedListOutlined
              className={`mx-2 ${
                viewData === "table" ? "active-icon" : "inactive-icon"
              }`}
              onClick={() => setViewData("table")}
            />
            <AreaChartOutlined
              className={`mx-2 ${
                viewData === "analytics" ? "active-icon" : "inactive-icon"
              }`}
              onClick={() => setViewData("analytics")}
            />
          </div>
          <div>
            <button
              className="btn btn-primary"
              onClick={() => setShowModal(true)}
            >
              Add
            </button>
          </div>
        </div>
        <div className="content">
          {viewData === "table" ? (
            <Table columns={columns} dataSource={allTransactions} />
          ) : (
            <Analytics allTransactions={allTransactions} />
          )}
        </div>
        <Modal
          title={editable ? "Edit Transaction" : "Add Transaction"}
          open={showModal}
          onCancel={()=>setShowModal(false)}
          footer={false}
        >
          <Form
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={editable}
          >
            <Form.Item label="Amount" name="amount">
              <Input type="text" />
            </Form.Item>
            <Form.Item label="Type" name="type">
              <Select>
                <Select.Option value="income">Income</Select.Option>
                <Select.Option value="expense">Expense</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Category" name="category">
              <Select>
                {categories.map((category) => {
                  return <Select.Option value={category}>
                    {category.toUpperCase()}
                  </Select.Option>;
                })}
              </Select>
            </Form.Item>
            <Form.Item label="Date" name="date">
              <Input type="date"></Input>
            </Form.Item>
            <Form.Item label="Reference" name="reference">
              <Input type="text"></Input>
            </Form.Item>
            <Form.Item label="Description" name="description">
              <Input type="text"></Input>
            </Form.Item>
            <div className="d-flex justify-content-end">
              <button className="btn btn-primary" type="submit">
                {" "}
                Save
              </button>
            </div>
          </Form>
        </Modal>
      </Layout>
    </>
  );
};

export default HomePage;
