import './editor.scss';
import './style.scss';
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { registerBlockType } from '@wordpress/blocks';
import {
	RichText,
	MediaUpload,
	InspectorControls,
	ColorPalette,
} from '@wordpress/block-editor';
import {
	Button,
	PanelBody,
	RangeControl,
	ToggleControl,
} from '@wordpress/components';

/**
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'guten-block/inline', {
	title: __( 'Inline Block' ),
	icon: 'menu',
	category: 'guten-blocks',
	attributes: {
		title: {
			type: 'string',
			source: 'html',
			selector: 'h3',
		},
		titleColor: {
			type: 'sring',
			default: 'black',
		},
		contentColor: {
			type: 'sring',
			default: 'black',
		},
		borderColor: {
			type: 'sring',
			default: 1,
		},
		borderWidth: {
			type: 'sring',
			default: 0,
		},
		mediaID: {
			type: 'number',
		},
		mediaURL: {
			type: 'string',
			source: 'attribute',
			selector: 'img',
			attribute: 'src',
		},
		content: {
			type: 'string',
			source: 'html',
			selector: 'p',
		},
		isDisabled: {
			type: 'boolean',
			source: false,
		},
	},

	/**
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */
	edit: props => {
		const {
			className,
			attributes: {
				title,
				mediaID,
				mediaURL,
				content,
				titleColor,
				contentColor,
				borderColor,
				borderWidth,
				isDisabled,
			},
			setAttributes,
		} = props;

		const onChangeTitle = value => {
			setAttributes( { title: value } );
		};

		const onSelectImage = media => {
			setAttributes( {
				mediaURL: media.url,
				mediaID: media.id,
			} );
		};
		const onChangeContent = value => {
			setAttributes( { content: value } );
		};

		const onChangeTitleColor = value => {
			setAttributes( { titleColor: value } );
		};

		const onChangeContentColor = value => {
			setAttributes( { contentColor: value } );
		};

		const onChangeBorderColor = value => {
			setAttributes( { borderColor: value } );
		};
		const onChangeBorderWidth = value => {
			setAttributes( { borderWidth: value } );
		};

		const onHideBlock = () => {
			setAttributes( { isDisabled: ! isDisabled } );
			console.log( attributes.isDisabled );
		};

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody initialOpen={ false } title={ 'Font Color Settings' }>
						<p>Select Title Color</p>
						<ColorPalette value={ titleColor } onChange={ onChangeTitleColor } />

						<p>Select Content Color</p>
						<ColorPalette
							value={ contentColor }
							onChange={ onChangeContentColor }
						/>
					</PanelBody>

					<PanelBody initialOpen={ false } title={ 'Box Border ' }>
						<p>Select Border Width</p>
						<RangeControl
							label="Border Width"
							value={ borderWidth }
							onChange={ onChangeBorderWidth }
						/>
						<p>Select Border Color</p>
						<ColorPalette value={ borderColor } onChange={ onChangeBorderColor } />
					</PanelBody>
					<PanelBody initialOpen={ false } title={ 'Hide Block ' }>
						<ToggleControl
							label="Hide Block"
							checked={ isDisabled }
							onChange={ onHideBlock }
						/>
					</PanelBody>
				</InspectorControls>

				<div className={ className }>
					<div
						className="inline__block_container"
						onChange={ ( onChangeBorderColor, onChangeBorderWidth ) }
						style={ { border: borderWidth + 'px ' + 'solid ' + borderColor } }
					>
						<div className="inline__block-content">
							<RichText
								tagName="h3"
								placeholder={ __( 'Write Title Here', 'guten-blocks' ) }
								value={ title }
								onChange={ onChangeTitle }
								className="inline__block-title"
								style={ { color: titleColor } }
							/>
							<RichText
								tagName="p"
								placeholder={ __( 'Write Content Here', 'guten-blocks' ) }
								value={ content }
								onChange={ onChangeContent }
								style={ { color: contentColor } }
							/>
						</div>
						<div className="inline__block-image">
							<MediaUpload
								onSelect={ onSelectImage }
								allowedTypes="image"
								value={ mediaID }
								render={ ( { open } ) => (
									<Button
										className={ mediaID ? 'image-button' : 'button button-large' }
										onClick={ open }
									>
										{ ! mediaID ? (
											__( 'Upload Image', 'guten-blocks' )
										) : (
											<img
												src={ mediaURL }
												alt={ __( 'Upload Block Image', 'guten-blocks' ) }
											/>
										) }
									</Button>
								) }
							/>
						</div>
					</div>
				</div>
			</Fragment>
		);
	},

	/**
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Frontend HTML.
	 */
	save: props => {
		const {
			className,
			attributes: {
				title,
				titleColor,
				mediaURL,
				content,
				contentColor,
				borderColor,
				borderWidth,
			},
		} = props;
		return (
			<div className={ className }>
				<div
					className="inline__block_container"
					style={ { border: borderWidth + 'px ' + 'solid ' + borderColor } }
				>
					<div className="inline__block-content">
						<RichText.Content
							tagName="h3"
							value={ title }
							className="inline__block-title"
							style={ { color: titleColor } }
						/>
						<RichText.Content
							tagName="p"
							value={ content }
							style={ { color: contentColor } }
						/>
					</div>
					<div className="inline__block-image">
						{ mediaURL && (
							<img src={ mediaURL } alt={ __( 'Block Image', 'guten-blocks' ) } />
						) }
					</div>
				</div>
			</div>
		);
	},
} );
