import UpdateBal from '@/components/UpdateBal';
import AdminLayout from '@/components/admin/AdminLayout';
import React from 'react';

const creditAcc = () => {
	return (
		<AdminLayout>
			<UpdateBal api='credit-acc' CROrDR='Credit' />
		</AdminLayout>
	);
};

export default creditAcc;
