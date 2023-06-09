import matter from 'gray-matter';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { Post } from '../../types';

import md from 'markdown-it';
import marked from 'marked';
import { formatDate, formatLocaleStringWithoutSeconds } from '../../libs/utils';
import { useEffect, useState } from 'react';
import { Timestamp } from 'firebase/firestore';

type Props = { post: Post };
export default function PostContent({ post }: Props) {
	const { createdAt, updatedAt } = post;
	const [createdAtState, setCreatedAtState] = useState<Date>(() =>
		typeof createdAt === 'number' ? new Date(createdAt) : createdAt.toDate()
	);
	const [updatedAtState, setUpdatedAtState] = useState(() =>
		typeof updatedAt === 'number' ? new Date(updatedAt) : updatedAt.toDate()
	);
	// console.log(
	// 	'🚀 ~ file: PostContent.tsx:21 ~ PostContent ~ updatedAtState:',
	// 	updatedAtState,
	// 	createdAtState
	// );
	// useEffect(() => {
	// 	setCreatedAtState(prevState => new Date(prevState).toLocaleDateString());
	// }, [createdAt]);
	// const createdAt =
	// 	typeof post.createdAt === 'number'
	// 		? new Date(post.createdAt)
	// 		: post.createdAt.toDate();
	// const updatedAt =
	// 	typeof post.updatedAt === 'number'
	// 		? new Date(post.updatedAt)
	// 		: post.updatedAt.toDate();

	const { data, content } = matter(post.content);

	// const createdAtString = post.createdAt.toDate();
	// console.log(
	// 	'🚀 ~ file: PostContent.tsx:24 ~ PostContent ~ createdAtString:',
	// 	createdAtState
	// );

	// const updatedAtString = formatDate(
	// 	formatLocaleStringWithoutSeconds(updatedAt)
	// );

	return (
		<>
			<div className='mb-4'>
				<h1 className='text-2xl font-bold mb-4'>{post.title}</h1>
				<span className='text-base'>
					Written by{' '}
					<Link href={`/${post.username}`} className='link text-blue-700'>
						@{post.username}
					</Link>{' '}
					on {formatDate(createdAtState)}
					{formatDate(createdAtState) !== formatDate(updatedAtState) &&
						`, Updated on ${formatDate(updatedAtState)}`}
				</span>
			</div>
			<div className='bg-base-100 px-4 py-8'>
				<ReactMarkdown className='prose'>{content}</ReactMarkdown>
			</div>
			{/* <div
				className='prose lg:prose-xl'
				dangerouslySetInnerHTML={{ __html: md().render(post.content) }}
			/> */}
		</>
	);
}
