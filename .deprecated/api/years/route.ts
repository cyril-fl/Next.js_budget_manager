import { ApiResponse } from '@/types';
import { utilsRefineData } from '@utils/utilsApi';
import { NextRequest, NextResponse } from 'next/server';
import data from '../../../fake_api/data.json';
/*
	TODO: Etablir un ordre pour les paramètres
		1) Filter - Filtre les data pour n'utiliser que le necessaire
		2) Sort - Ordoner les data dans l'odre final
			- Si la valeur fields est diffirent de string ou number lors on ne peut pas la filtrer et on revoir un vide
		3) Fields - Ne rendre que les clé voulue
		4) MaxRecord - Ne rendre que ce qu'il faut.
*/
export async function GET(req: NextRequest) {
	const searchParams = req.nextUrl.searchParams;
	const params = Object.fromEntries(searchParams.entries());
	const refinedData = utilsRefineData([...data.years], params);

	const res: ApiResponse = {
		message: 'Year',
		success: true,
		data: refinedData,
	};
	return NextResponse.json(res, { status: 200 });
}
