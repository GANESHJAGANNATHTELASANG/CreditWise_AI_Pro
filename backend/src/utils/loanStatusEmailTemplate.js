export const loanStatusEmailTemplate = ({ name, status, loanAmount }) => {
  const isApproved = status === "Approved";

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Loan Application Status</title>
      </head>

      <body style="
        margin: 0;
        padding: 0;
        background-color: #f5f7fb;
        font-family: Arial, Helvetica, sans-serif;
        color: #1f2937;
      ">

        <!-- Main Wrapper -->
        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          border="0"
          style="background-color: #f5f7fb; padding: 40px 15px;"
        >
          <tr>
            <td align="center">

              <!-- Email Container -->
              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                style="
                  max-width: 600px;
                  background-color: #ffffff;
                  border-radius: 14px;
                  overflow: hidden;
                  box-shadow: 0 8px 30px rgba(15, 23, 42, 0.08);
                "
              >

                <!-- Header -->
                <tr>
                  <td style="
                    background-color: #111827;
                    padding: 28px 35px;
                    text-align: center;
                  ">

                    <div style="
                      font-size: 24px;
                      font-weight: 700;
                      color: #ffffff;
                      letter-spacing: 0.5px;
                    ">
                      Loan<span style="color: #60a5fa;">Wise</span>
                    </div>

                    <div style="
                      margin-top: 7px;
                      font-size: 13px;
                      color: #9ca3af;
                      letter-spacing: 0.3px;
                    ">
                      Loan Management System
                    </div>

                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding: 40px 35px 35px;">

                    <!-- Greeting -->
                    <h2 style="
                      margin: 0 0 12px;
                      font-size: 24px;
                      font-weight: 700;
                      color: #111827;
                    ">
                      Hello ${name},
                    </h2>

                    <p style="
                      margin: 0;
                      font-size: 15px;
                      line-height: 1.7;
                      color: #6b7280;
                    ">
                      We are writing to inform you about the latest status
                      of your loan application.
                    </p>

                    <!-- Status Card -->
                    <table
                      width="100%"
                      cellpadding="0"
                      cellspacing="0"
                      border="0"
                      style="
                        margin: 30px 0;
                        border-radius: 12px;
                        background-color: ${isApproved ? "#ecfdf5" : "#fef2f2"};
                        border: 1px solid ${isApproved ? "#a7f3d0" : "#fecaca"};
                      "
                    >
                      <tr>
                        <td style="padding: 28px; text-align: center;">

                          <!-- Status Label -->
                          <div style="
                            font-size: 12px;
                            font-weight: 700;
                            letter-spacing: 1.2px;
                            text-transform: uppercase;
                            color: ${isApproved ? "#047857" : "#b91c1c"};
                            margin-bottom: 10px;
                          ">
                            Application Status
                          </div>

                          <!-- Status -->
                          <div style="
                            font-size: 30px;
                            font-weight: 700;
                            color: ${isApproved ? "#047857" : "#b91c1c"};
                          ">
                            ${status}
                          </div>

                        </td>
                      </tr>
                    </table>

                    <!-- Loan Information -->
                    <table
                      width="100%"
                      cellpadding="0"
                      cellspacing="0"
                      border="0"
                      style="
                        margin-bottom: 25px;
                        border: 1px solid #e5e7eb;
                        border-radius: 10px;
                      "
                    >
                      <tr>
                        <td style="
                          padding: 18px 20px;
                          color: #6b7280;
                          font-size: 14px;
                        ">
                          Loan Application
                        </td>

                        <td align="right" style="
                          padding: 18px 20px;
                          color: #111827;
                          font-size: 18px;
                          font-weight: 700;
                        ">
                          ₹${loanAmount}
                        </td>
                      </tr>
                    </table>

                    <!-- Status Message -->
                    <p style="
                      margin: 0;
                      font-size: 15px;
                      line-height: 1.7;
                      color: #4b5563;
                    ">
                      Your loan application for
                      <strong style="color: #111827;">
                        ₹${loanAmount}
                      </strong>
                      has been
                      <strong style="color: #111827;">
                        ${status.toLowerCase()}
                      </strong>.
                    </p>

                    ${
                      isApproved
                        ? `
                          <!-- Approved Message -->
                          <div style="
                            margin-top: 25px;
                            padding: 18px 20px;
                            background-color: #f9fafb;
                            border-left: 4px solid #10b981;
                            border-radius: 6px;
                          ">
                            <p style="
                              margin: 0;
                              font-size: 15px;
                              line-height: 1.7;
                              color: #4b5563;
                            ">
                              <strong style="color: #047857;">
                                Congratulations!
                              </strong>
                              Your loan application has been approved.
                              Our team will contact you with the next
                              steps.
                            </p>
                          </div>
                        `
                        : `
                          <!-- Rejected Message -->
                          <div style="
                            margin-top: 25px;
                            padding: 18px 20px;
                            background-color: #f9fafb;
                            border-left: 4px solid #ef4444;
                            border-radius: 6px;
                          ">
                            <p style="
                              margin: 0;
                              font-size: 15px;
                              line-height: 1.7;
                              color: #4b5563;
                            ">
                              Unfortunately, your loan application has been
                              rejected at this time. If you have any
                              questions, please contact our support team.
                            </p>
                          </div>
                        `
                    }

                    <!-- Closing -->
                    <p style="
                      margin: 32px 0 0;
                      font-size: 15px;
                      line-height: 1.7;
                      color: #6b7280;
                    ">
                      Thank you for choosing our services.
                    </p>

                    <p style="
                      margin: 20px 0 0;
                      font-size: 15px;
                      line-height: 1.6;
                      color: #374151;
                    ">
                      Best regards,<br />
                      <strong style="color: #111827;">
                        Loan Management Team
                      </strong>
                    </p>

                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="
                    padding: 25px 35px;
                    background-color: #f9fafb;
                    border-top: 1px solid #e5e7eb;
                    text-align: center;
                  ">

                    <p style="
                      margin: 0;
                      font-size: 12px;
                      line-height: 1.6;
                      color: #9ca3af;
                    ">
                      This is an automated email regarding your
                      loan application.
                    </p>

                    <p style="
                      margin: 8px 0 0;
                      font-size: 12px;
                      color: #9ca3af;
                    ">
                      © ${new Date().getFullYear()} LoanWise.
                      All rights reserved.
                    </p>

                  </td>
                </tr>

              </table>

            </td>
          </tr>
        </table>

      </body>
    </html>
  `;
};
