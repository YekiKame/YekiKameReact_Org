import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import JoinRequestModal from "../joinRequestModal/joinRequestModal.jsx";
import styles from "./editeventmodal.module.css";
import Button from "../../shared/button/button.jsx";

const EditEventModal = ({ isOpen, onClose, eventId, onEventUpdated }) => {
  const storedPhoneNumber = sessionStorage.getItem("userPhone") || "";
  const [isJoinRequestModalOpen, setJoinRequestModalOpen] = useState(false);
  const [initialValues, setInitialValues] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!eventId || !isOpen) return;

    const fetchEventDetails = async () => {
      try {
        const query = `
          query {
            eventDetails(eventId: "${eventId}") {
              error
              event {
                title
                eventCategory
                aboutEvent
                image
                startDate
                endDate
                province
                city
                neighborhood
                postalAddress
                postalCode
                registrationStartDate
                registrationEndDate
                fullDescription
                maxSubscribers
              }
            }
          }
        `;

        const response = await axios.post("http://127.0.0.1:8000/graphql/", { query });
        const result = response.data?.data?.eventDetails;

        if (result?.error) {
          setError(result.error);
        } else if (result?.event) {
          setInitialValues(result.event);
        }
      } catch (err) {
        setError("خطایی در دریافت اطلاعات رویداد رخ داد.");
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId, isOpen]);

  if (!isOpen) return null;

  if (loading) return <div>در حال بارگذاری...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("عنوان رویداد الزامی است"),
    eventCategory: Yup.string().required("دسته‌بندی الزامی است"),
    aboutEvent: Yup.string().required("توضیحات کوتاه الزامی است"),
    startDate: Yup.string().required("تاریخ شروع الزامی است"),
    endDate: Yup.string().required("تاریخ پایان الزامی است"),
    registrationStartDate: Yup.string().required("تاریخ شروع ثبت‌نام الزامی است"),
    registrationEndDate: Yup.string().required("تاریخ پایان ثبت‌نام الزامی است"),
    province: Yup.string().required("استان الزامی است"),
    city: Yup.string().required("شهر الزامی است"),
    neighborhood: Yup.string(),
    postalAddress: Yup.string().required("آدرس الزامی است"),
    postalCode: Yup.string(),
    maxSubscribers: Yup.number()
      .typeError("حداکثر تعداد افراد باید یک عدد باشد")
      .min(1, "حداقل یک نفر باید وارد شود"),
    image: Yup.mixed(),
    fullDescription: Yup.string(),
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    const mutation = `
      mutation {
        updateEventDetail(
          eventId: "${eventId}",
          phone: "${storedPhoneNumber}",
          ${values.title ? `title: "${values.title}",` : ""}
          ${values.eventCategory ? `eventCategory: "${values.eventCategory}",` : ""}
          ${values.aboutEvent ? `aboutEvent: "${values.aboutEvent}",` : ""}
          ${values.startDate ? `startDate: "${values.startDate}",` : ""}
          ${values.endDate ? `endDate: "${values.endDate}",` : ""}
          ${values.registrationStartDate ? `registrationStartDate: "${values.registrationStartDate}",` : ""}
          ${values.registrationEndDate ? `registrationEndDate: "${values.registrationEndDate}",` : ""}
          ${values.province ? `province: "${values.province}",` : ""}
          ${values.city ? `city: "${values.city}",` : ""}
          ${values.neighborhood ? `neighborhood: "${values.neighborhood}",` : ""}
          ${values.postalAddress ? `postalAddress: "${values.postalAddress}",` : ""}
          ${values.postalCode ? `postalCode: "${values.postalCode}",` : ""}
          ${values.maxSubscribers ? `maxSubscribers: ${values.maxSubscribers},` : ""}
          ${values.image ? `image: "${values.image}",` : ""}
          ${values.fullDescription ? `fullDescription: "${values.fullDescription}"` : ""}
        ) {
          success
          message
        }
      }
    `;

    try {
      const response = await axios.post("http://127.0.0.1:8000/graphql/", { query: mutation });
      const result = response.data?.data?.updateEventDetail;

      if (result?.success) {
        onEventUpdated();
        onClose();
      } else {
        setErrors({ general: result.message });
      }
    } catch (err) {
      setErrors({ general: "خطایی در ویرایش رویداد رخ داد." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <Button
          text="مشاهده درخواست‌های عضویت در رویداد"
          onClick={() => setJoinRequestModalOpen(true)}
          variant="large"
        />

        <h2 className={styles.title}>ویرایش جزئیات رویداد</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ setFieldValue, isSubmitting, errors }) => (
            <Form>
              {/* فیلدها */}
              <div className={styles.row}>
                <div className={styles.fieldGroup}>
                  <label htmlFor="title">عنوان رویداد:</label>
                  <Field type="text" id="title" name="title" />
                  <ErrorMessage name="title" component="div" className={styles.error} />
                </div>
                <div className={styles.fieldGroup}>
                  <label htmlFor="eventCategory">دسته‌بندی:</label>
                  <Field as="select" id="eventCategory" name="eventCategory">
                    <option value="">انتخاب کنید</option>
                    <option value="education">آموزشی</option>
                    <option value="sport">ورزشی</option>
                    <option value="social">فرهنگی</option>
                    <option value="entertainment">تفریحی</option>
                    <option value="game">بازی</option>
                  </Field>
                  <ErrorMessage name="eventCategory" component="div" className={styles.error} />
                </div>
              </div>
              <div className={styles.fieldGroup}>
                <label htmlFor="aboutEvent">توضیحات:</label>
                <Field as="textarea" id="aboutEvent" name="aboutEvent" />
                <ErrorMessage name="aboutEvent" component="div" className={styles.error} />
              </div>

              <div className={styles.row}>
                <div className={styles.fieldGroup}>
                  <label htmlFor="startDate">تاریخ شروع:</label>
                  <Field type="datetime-local" id="startDate" name="startDate" />
                  <ErrorMessage name="startDate" component="div" className={styles.error} />
                </div>

                <div className={styles.fieldGroup}>
                  <label htmlFor="endDate">تاریخ پایان:</label>
                  <Field type="datetime-local" id="endDate" name="endDate" />
                  <ErrorMessage name="endDate" component="div" className={styles.error} />
                </div>

                <div className={styles.fieldGroup}>
                  <label htmlFor="registrationStartDate">تاریخ شروع ثبت‌نام:</label>
                  <Field type="datetime-local" id="registrationStartDate" name="registrationStartDate" />
                  <ErrorMessage name="registrationStartDate" component="div" className={styles.error} />
                </div>

                <div className={styles.fieldGroup}>
                  <label htmlFor="registrationEndDate">تاریخ پایان ثبت‌نام:</label>
                  <Field type="datetime-local" id="registrationEndDate" name="registrationEndDate" />
                  <ErrorMessage name="registrationEndDate" component="div" className={styles.error} />
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.fieldGroup}>
                  <label htmlFor="province">استان:</label>
                  <Field type="text" id="province" name="province" />
                  <ErrorMessage name="province" component="div" className={styles.error} />
                </div>

                <div className={styles.fieldGroup}>
                  <label htmlFor="city">شهر:</label>
                  <Field type="text" id="city" name="city" />
                  <ErrorMessage name="city" component="div" className={styles.error} />
                </div>

                <div className={styles.fieldGroup}>
                  <label htmlFor="neighborhood">محله:</label>
                  <Field type="text" id="neighborhood" name="neighborhood" />
                  <ErrorMessage name="neighborhood" component="div" className={styles.error} />
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.fieldGroup}>
                  <label htmlFor="postalAddress">آدرس پستی:</label>
                  <Field as="textarea" id="postalAddress" name="postalAddress" />
                  <ErrorMessage name="postalAddress" component="div" className={styles.error} />
                </div>

                <div className={styles.fieldGroup}>
                  <label htmlFor="postalCode">کد پستی:</label>
                  <Field type="text" id="postalCode" name="postalCode" />
                  <ErrorMessage name="postalCode" component="div" className={styles.error} />
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.fieldGroup}>
                  <label htmlFor="maxSubscribers">حداکثر تعداد افراد:</label>
                  <Field type="number" id="maxSubscribers" name="maxSubscribers" />
                  <ErrorMessage name="maxSubscribers" component="div" className={styles.error} />
                </div>

                <div className={styles.fieldGroup}>
                  <label htmlFor="image">تصویر:</label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={(event) =>
                      setFieldValue("image", event.target.files[0]?.name || "")
                    }
                  />
                  <ErrorMessage name="image" component="div" className={styles.error} />
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <label htmlFor="fullDescription">توضیحات تکمیلی:</label>
                <Field as="textarea" id="fullDescription" name="fullDescription" />
                <ErrorMessage name="fullDescription" component="div" className={styles.error} />
              </div>

              {errors.general && <div className={styles.error}>{errors.general}</div>}

              <div className={styles.actions}>
                <Button text="انصراف" onClick={onClose} disabled={isSubmitting} variant="outline" />
                <Button
                  text={isSubmitting ? "در حال ارسال..." : "ذخیره تغییرات"}
                  type="submit"
                  disabled={isSubmitting}
                  variant="primary"
                />
              </div>
            </Form>
          )}
        </Formik>

        {isJoinRequestModalOpen && (
          <JoinRequestModal
            isOpen={isJoinRequestModalOpen}
            onClose={() => setJoinRequestModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default EditEventModal;
