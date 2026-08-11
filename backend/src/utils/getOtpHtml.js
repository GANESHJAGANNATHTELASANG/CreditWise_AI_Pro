const getOtpHtml = ({ otp, name, expiryMinutes }) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />

  <title>Verify Your Email - CreditWise</title>
</head>

<body
  style="
    margin: 0;
    padding: 0;
    background-color: #f4f7fb;
    font-family: Arial, Helvetica, sans-serif;
    color: #172033;
  "
>

  <!-- Main Wrapper -->
  <table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    border="0"
    style="
      background-color: #f4f7fb;
      padding: 40px 15px;
    "
  >
    <tr>
      <td align="center">

        <!-- Email Card -->
        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          border="0"
          style="
            max-width: 600px;
            background-color: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            border: 1px solid #e8edf5;
          "
        >

          <!-- ================= HEADER ================= -->

          <tr>
            <td
              align="center"
              style="
                padding: 32px 30px 26px;
                background-color: #111827;
              "
            >

              <!-- Logo -->
              <div
                style="
                  display: inline-block;
                  width: 52px;
                  height: 52px;
                  line-height: 52px;
                  border-radius: 14px;
                  background-color: #ffffff;
                  color: #111827;
                  font-size: 24px;
                  font-weight: 700;
                  margin-bottom: 16px;
                "
              >
                C
              </div>

              <!-- Brand -->
              <div
                style="
                  font-size: 24px;
                  line-height: 32px;
                  font-weight: 700;
                  color: #ffffff;
                "
              >
                CreditWise
              </div>

              <div
                style="
                  font-size: 14px;
                  line-height: 22px;
                  color: #cbd5e1;
                  margin-top: 6px;
                "
              >
                Secure account verification
              </div>

            </td>
          </tr>


          <!-- ================= CONTENT ================= -->

          <tr>
            <td
              style="
                padding: 42px 40px 35px;
              "
            >

              <!-- Heading -->

              <div
                style="
                  font-size: 26px;
                  line-height: 34px;
                  font-weight: 700;
                  color: #111827;
                  margin-bottom: 14px;
                "
              >
                Verify your email
              </div>


              <!-- Introduction -->

              <div
                style="
                  font-size: 15px;
                  line-height: 25px;
                  color: #5b6475;
                  margin-bottom: 26px;
                "
              >

                Hello ${name},

                <br />
                <br />

                We received a request to verify your email address
                for your CreditWise account.

                <br />

                Enter the verification code below to continue.

              </div>


              <!-- ================= OTP BOX ================= -->

              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                style="
                  background-color: #f8fafc;
                  border: 1px solid #e2e8f0;
                  border-radius: 12px;
                "
              >

                <tr>

                  <td
                    align="center"
                    style="
                      padding: 25px 15px;
                    "
                  >

                    <!-- Label -->

                    <div
                      style="
                        font-size: 12px;
                        line-height: 18px;
                        color: #64748b;
                        text-transform: uppercase;
                        letter-spacing: 2px;
                        font-weight: 700;
                        margin-bottom: 10px;
                      "
                    >
                      Verification Code
                    </div>


                    <!-- OTP -->

                    <div
                      style="
                        font-size: 34px;
                        line-height: 42px;
                        font-weight: 700;
                        letter-spacing: 9px;
                        color: #111827;
                        padding-left: 9px;
                      "
                    >
                      ${otp}
                    </div>


                    <!-- Expiry -->

                    <div
                      style="
                        font-size: 13px;
                        line-height: 20px;
                        color: #64748b;
                        margin-top: 12px;
                      "
                    >
                      This code expires in ${expiryMinutes} minutes.
                    </div>

                  </td>

                </tr>

              </table>


              <!-- ================= SECURITY NOTICE ================= -->

              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                style="
                  margin-top: 25px;
                "
              >

                <tr>

                  <!-- Icon -->

                  <td
                    width="34"
                    valign="top"
                  >

                    <div
                      style="
                        width: 26px;
                        height: 26px;
                        line-height: 26px;
                        text-align: center;
                        border-radius: 50%;
                        background-color: #eef2ff;
                        color: #4f46e5;
                        font-size: 14px;
                        font-weight: 700;
                      "
                    >
                      !
                    </div>

                  </td>


                  <!-- Security Message -->

                  <td
                    style="
                      padding-left: 10px;
                    "
                  >

                    <div
                      style="
                        font-size: 13px;
                        line-height: 21px;
                        color: #64748b;
                      "
                    >

                      <strong
                        style="
                          color: #334155;
                        "
                      >
                        Security tip:
                      </strong>

                      Never share this verification code with anyone.

                      CreditWise support will never ask you for your OTP.

                    </div>

                  </td>

                </tr>

              </table>


              <!-- Divider -->

              <div
                style="
                  height: 1px;
                  background-color: #e5e7eb;
                  margin: 30px 0 24px;
                "
              ></div>


              <!-- Wrong Request -->

              <div
                style="
                  font-size: 13px;
                  line-height: 21px;
                  color: #94a3b8;
                "
              >

                If you did not request this verification code,
                you can safely ignore this email.

                Your account remains protected.

              </div>

            </td>
          </tr>


          <!-- ================= FOOTER ================= -->

          <tr>

            <td
              align="center"
              style="
                padding: 25px 30px;
                background-color: #f8fafc;
                border-top: 1px solid #eef2f7;
              "
            >

              <div
                style="
                  font-size: 13px;
                  line-height: 20px;
                  color: #64748b;
                "
              >
                © ${new Date().getFullYear()} CreditWise.
                All rights reserved.
              </div>


              <div
                style="
                  font-size: 12px;
                  line-height: 19px;
                  color: #94a3b8;
                  margin-top: 6px;
                "
              >
                This is an automated security email.
                Please do not reply.
              </div>

            </td>

          </tr>

        </table>


        <!-- Bottom Information -->

        <div
          style="
            max-width: 600px;
            padding: 18px 15px 0;
            text-align: center;
            font-size: 11px;
            line-height: 18px;
            color: #9aa4b2;
          "
        >
          You received this email because a verification request
          was made for your account.
        </div>

      </td>
    </tr>
  </table>

</body>
</html>
  `;
};

export { getOtpHtml };
