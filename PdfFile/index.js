module.exports = (pdfObj) => {
	const { orderData, challanNo, date, customer, invoiceNo, challanDate, orderNumber, orderDate, ewbNo, ewbDate, dispatchDocNo, dispatchDocDate, dispatchThrough, destination, termsOfDelivery, interState, grandTotalInWords, remark, grandTotal } = pdfObj;
	let gstFive = 0.0;
	let gstTwelve = 0.0;
	let gstEighteen = 0.0;
	let gstTwentyEight = 0.0;
	let totalRate = 0.0;
	const parseDate = (unparsed_date) => {
		if(!unparsed_date) {
			return "";
		}
		let dateArray = new Date(unparsed_date).toLocaleDateString().split('/');
		if(dateArray[0] < 10) {
			dateArray[0] = 0 + dateArray[0];
		}
		if(dateArray[1] < 10) {
			dateArray[1] = 0 + dateArray[1];
		}
		return dateArray[1] + '/' + dateArray[0] + '/' + dateArray[2];
	}
	const rowData = () => {
		let row = '';
		orderData.forEach((item, index) => {
			let itemExp;
			if(item.exp) {
				itemExp = parseDate(item.exp);
			}
			let rate = parseFloat(item.sellingRate.toFixed(2));
			let quantity = parseFloat(item.checkout);
			let total = rate * quantity;
			totalRate += total;
			let totalGst = total * (item.gst / 100);
			if(item.gst === 5) {
				gstFive += total * (item.gst / 100);
			}
			if(item.gst === 12) {
				gstTwelve += total * (item.gst / 100);
			}
			if(item.gst === 18) {
				gstEighteen += total * (item.gst / 100);
			}
			if(item.gst === 28) {
				gstTwentyEight += total * (item.gst / 100);
			}
			const lotExp = (lotNo, itemExp) => {
				return `<div style="font-size: 8px">
				${'Batch:' + lotNo}<br>
				${'Expiry:' + itemExp}
			   </div>`;
			}
			row += `<tr>
			<td>${++index}</td>
			<td>${item.itemCode}</td>
			<td style="text-align: left">
				<strong>${item.item}</strong><br>
				${item.lotNo === '0' ? '' : lotExp(item.lotNo, itemExp)}
			</td>
			<td>${item.hsn}</td>
			<td>${quantity}</td>
			<td>${item.uom}</td>
			<td>${rate.toFixed(2)}</td>
			<td>${total.toFixed(2)}</td>
			<td>${item.gst}%</td>
			<td>${totalGst.toFixed(2)}</td>
			<td>${(total + totalGst).toFixed(2)}</td>
		</tr>`
		});
		return row;
	}
 
 return `
 <!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>Invoice</title>
		<style type="text/css">@import url(https://fonts.googleapis.com/css?family=Open+Sans:400,) 400i, 600, 600i, 700;a,abbr,acronym,address,applet,article,aside,audio,b,big,blockquote,body,canvas,caption,center,cite,code,dd,del,details,dfn,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,html,i,iframe,img,ins,kbd,label,legend,li,mark,menu,nav,object,ol,output,p,pre,q,ruby,s,samp,section,small,span,strike,strong,sub,sup,table,tbody,td,tfoot,th,thead,time,tr,tt,u,ul,var,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:after,blockquote:before,q:after,q:before{content:'';content:none}table{border-collapse:collapse;border-spacing:0}body{height:940px;width:650px;margin:auto;font-family:'Open Sans',sans-serif;font-size:11px}strong{font-weight:700}#container{position:relative;padding:.5%}#header{height:120px}#header>#reference{text-align:right;border:solid grey 1px;border-left:none;width:49.5%;height:120px;float:right}#header>#logo{width:50%;height:120px;border:solid grey 1px;float:left}.brand-box{padding:10px}.details{height:45.68px;border:solid grey 1px;border-left:none;border-right:none;border-top:none}.details-bottom{height:30px;border-bottom:solid grey 1px}.sub-details{float:left;width:50%;height:46.5px;border-right:solid grey 1px}.sub-details-reference{float:left;width:50%;height:30px;border-right:solid grey 1px}.sub-details-two{float:right;width:49.5%}.float-left{float:left}#items>p{font-weight:700;text-align:right;margin-bottom:1%;font-size:65%}#items>table{width:100%;font-size:85%;border:solid grey 1px}#items>table th:first-child{text-align:left}#items>table th{font-weight:400;padding:1px 4px}#items>table td{padding:1px 4px}#items>table th:nth-child(3){width:150px}#items>table tr td:not(:first-child){text-align:center;padding-right:1%}#items table td{border-right:solid grey 1px}#items table tr td{padding-top:3px;padding-bottom:8px;height:10px}#items table tr:nth-child(1){border:solid grey 1px}#items table tr th{border-right:solid grey 1px;padding:10px}#items table tr:nth-child(2)>td{padding-top:8px}.sub-total-row{border:none!important}#gst-items>p{font-weight:700;text-align:right;margin-bottom:1%;font-size:65%}#gst-items>table{width:100%;font-size:85%;border:solid grey 1px}#gst-items table td{border-right:solid grey 1px}#gst-items table tr td{padding-top:1px;padding-bottom:2px;height:5px}#gst-items table tr:nth-child(1){border:solid grey 1px}#gst-items table tr th{border-right:solid grey 1px}</style>
	</head>
	<body>
		<div id="container" style="margin-top: 10px;">
			<h3 style="text-align: center; font-weight: 700; font-size: 15px; margin-bottom: 5px;">GST INVOICE</h3>
			<div>
				<div id="header">
					<div id="logo">
						<div class="brand-box">
							<strong style="font-size: 25px;">SATVIK SOLUTIONS</strong></br>
							<div>
								Godarwaripuram, Lower Nathanpur,<br>
								Dehradun -248 001, UTTARAKHAND<br>
								<span style="font-size: 8px">
								Tel: +919415006121 , +918787050389<br>
								email: satsolindia@gmail.com , info@satsolindia.com<br>
								website: satsolindia.com<br>
								</span>
								<span style="font-size: 9px">
								DL# UA-DEH-106185/106186 WEF:06.03.2019<br>
								GSTIN : 05BCBPN1106J1Z2 
								</span>
							</div>
						</div>
					</div>
					<div id="reference">
						<div class="details">
							<div class="sub-details">
								<div class="float-left">Invoice No.</div><br/>
								<div class="float-left"><strong>${invoiceNo}</strong></div>
							</div>
							<div class="sub-details-two" style="border-right: none;">
								<div class="float-left">Invoice Date:</div><br/>
								<div class="float-left"><strong>${parseDate(date)}</strong></div>
							</div>
						</div>
						<div class="details">
							<div class="sub-details"><div class="float-left">Challan No.:</div><br/><div class="float-left">${challanNo}</div></div>
							<div class="sub-details-two" style="border-right: none;"><div class="float-left">Challan Date:</div><br/><div class="float-left">${parseDate(challanDate)}</div></div>
						</div>
						<div class="details" style="border-bottom: none;">
							<div class="sub-details"><div class="float-left">Order No.:</div><br/><div class="float-left">${orderNumber}</div></div>
							<div class="sub-details-two" style="border-right: none;"><div class="float-left">Order Date:</div><br/><div class="float-left">${parseDate(orderDate)}</div></div>
						</div>
					</div>
				</div>
				<div id="header">
					<div id="logo" style="border-top: none; border-bottom: none;">
						<div class="brand-box" style="padding-top: 5px;">
							<p style="font-style: italic; margin-bottom: 10px;">Consignee:</p>
							<div style="font-weight: 600;">
								${customer.name}<br>
								${customer.address},<br>
								${customer.city} - ${customer.zip}<br>
								${customer.gst !== 'NO' ? 'GSTIN :'.concat(customer.gst) : ''}
							</div>
						</div>
					</div>
					<div id="reference" style="border-top: none; border-bottom: none">
						<div class="details-bottom">
							<div class="sub-details-reference"><div class="float-left">EWB No.:</div><br/><div class="float-left">${ewbNo === undefined ? "" : ewbNo}</div></div>
							<div class="sub-details-two" style="border-right: none;"><div class="float-left">EWB Date:</div><br/><div class="float-left">${parseDate(ewbDate)}</div></div>
						</div>
						<div class="details-bottom">
							<div class="sub-details-reference"><div class="float-left">Dispatch Doc. No.:</div><br/><div class="float-left">${dispatchDocNo === undefined ? "" : dispatchDocNo}</div></div>
							<div class="sub-details-two" style="border-right: none;"><div class="float-left">Dispatch Doc. Date:</div><br/><div class="float-left">${parseDate(dispatchDocDate)}</div></div>
						</div>
						<div class="details-bottom">
							<div class="sub-details-reference"><div class="float-left">Dispatch Through:</div><br/><div class="float-left">${dispatchThrough}</div></div>
							<div class="sub-details-two" style="border-right: none;"><div class="float-left">Destination:</div><br/><div class="float-left">${destination}</div></div>
						</div>
						<div class="details-bottom" style="border-bottom: none;"><div class="float-left">Terms of Delivery:</div><br/><div class="float-left">${termsOfDelivery}</div></div>
					</div>
				</div>
			</div>
			<div id="items">
				<table>
					<tr>
						<th>SL</th>
						<th>Item Code</th>
						<th>Description of Goods</th>
						<th>HSN/SAC</th>
						<th>QTY</th>
						<th>UOM</th>
						<th>RATE INR</th>
						<th>SUB TOTAL</th>
						<th>GST%</th>
						<th>GST VALUE</th>
						<th>Amount INR</th>
					</tr>
					${rowData()}
					<tr style="border-top: 1px solid grey; font-weight: 600;">
						<td class="sub-total-row"></td>
						<td class="sub-total-row"></td>
						<td class="sub-total-row"></td>
						<td class="sub-total-row"></td>
						<td class="sub-total-row"></td>
						<td class="sub-total-row"></td>
						<td style="text-align: right; padding: 5px 2px;">TOTAL</td>
						<td>${totalRate.toFixed(2)}</td>
						<td></td>
						<td>${(gstFive + gstTwelve + gstEighteen + gstTwentyEight).toFixed(2)}</td>
						<td>${(gstFive + gstTwelve + gstEighteen + gstTwentyEight + totalRate).toFixed(2)}</td>
					</tr>
				</table>
				<div style="float: right; margin: 5px; font-weight: 700; margin-right: 8px;"><u><span style="font-style: italic; font-weight: 700;">Total value rounded off: ₹${grandTotal.toFixed(2)}</span></u></div>
			</div>
			<div style="border: 1px solid grey; border-top: none; padding: 5px 0 5px 5px; height: 285px; line-height: 1.5;">
				<div style="margin-bottom: 20px;">
					<div>E. & O.E</div>
					<div>Amount Chargeable(in words)</div>
					<strong>INR ${grandTotalInWords}</strong><br/><br/>
					<div>${remark === undefined || remark === "" ? "" : 'Remarks: ' + remark}</div>
				</div>
				<div>
					<div style="float: left; width: 50%;">
						<div id="gst-items">
							<div style="text-align: center; font-weight: 700;">GST TAX SUMMARY</div>
							<table style="text-align: center;">
								<tr>
								  <th>GST</th>
								  <th>IGST</th>
								  <th>CGST</th>
								  <th>SGST</th>
								  <th>TOTAL</th>
								</tr>
								<tr>
									<td>5%</td>
									<td>${interState ? gstFive.toFixed(2) : '0.00'}</td>
									<td>${!interState ? (gstFive/2).toFixed(2) : '0.00'}</td>
									<td>${!interState ? (gstFive/2).toFixed(2) : '0.00'}</td>
									<td>${gstFive.toFixed(2)}</td>
								  </tr>
								<tr>
								  <td>12%</td>
								  <td>${interState ? gstTwelve.toFixed(2) : '0.00'}</td>
								  <td>${!interState ? (gstTwelve/2).toFixed(2) : '0.00'}</td>
								  <td>${!interState ? (gstTwelve/2).toFixed(2) : '0.00'}</td>
								  <td>${gstTwelve.toFixed(2)}</td>
								</tr>
								<tr>
									<td>18%</td>
									<td>${interState ? gstEighteen.toFixed(2) : '0.00'}</td>
									<td>${!interState ? (gstEighteen/2).toFixed(2) : '0.00'}</td>
									<td>${!interState ? (gstEighteen/2).toFixed(2) : '0.00'}</td>
									<td>${gstEighteen.toFixed(2)}</td>
								  </tr>
								  <tr>
									<td>28%</td>
									<td>${interState ? gstTwentyEight.toFixed(2) : '0.00'}</td>
									<td>${!interState ? (gstTwentyEight/2).toFixed(2) : '0.00'}</td>
									<td>${!interState ? (gstTwentyEight/2).toFixed(2) : '0.00'}</td>
									<td>${gstTwentyEight.toFixed(2)}</td>
								  </tr>

							</table>
						</div>
						<div style="font-size: 9px; margin-top: 10px;">
							<u>Declaration</u>
							<p>We declare that this invoice shows the actual price of the goods described and all particulars are true and correct.</p>
							<div>
								<ol>
									<li>1. Any claim by the purchaser which is based on a pre dispatch defects shall be notified within 7 days from the date of the sale.</li>
									<li>2. Interest @24% will be charged in delay payments.</li>
								</ol>
							</div>
						</div>
					</div>
					<div style="float: right; width: 45%; font-size: 11px;">
						<u>Company's Bank Details: </u>
						<div style="margin-bottom: 65px;">
							<div style="float: left;">
								<div>Bank Name:</div>
								<div>Account Number:</div>
								<div>Branch:</div>
								<div>IFSC Code:</div>
							</div>
							<div style="float: right; margin-right: 5px;">
								<div>Punjab National Bank</div>
								<div>1890050002561</div>
								<div>Dharampur, Dehradun - 248 001</div>
								<div>PUNB0189020</div>
							</div>
						</div>
						<div style="border: 1px solid grey; height: 112px; border-bottom: none; border-right: none; padding: 6px;">
							<div style="text-align: center;">for SATVIK SOLUTIONS</div><br/>
							<div style="text-align: center; margin-top: 55px;">Authorised Signatory</div>
						</div>
					</div>
				</div>
			</div>
			<div style="text-align: center; margin-top: 5px;">SUBJECT IN DEHRADUN JURISDICTION</div>
		</div>
	</body>
</html>
	`;
};